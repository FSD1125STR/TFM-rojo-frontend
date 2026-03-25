import { useState } from 'react';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import { SearchableSelect } from '../../../../components/ui/SearchableSelect';
import { createMatchEvent } from '../../../../services/matchesService';

export function ModalLiveSub({ isOpen, onClose, matchId, match, players }) {
  const [playerOutId, setPlayerOutId] = useState('');
  const [playerInId, setPlayerInId] = useState('');
  const [minute, setMinute] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const playerOptions = players.map((p) => ({ value: p.id, label: p.fullName }));

  async function handleSubmit() {
    if (!playerOutId) { setError('Selecciona el jugador que sale'); return; }
    if (!playerInId) { setError('Selecciona el jugador que entra'); return; }
    if (!minute || Number(minute) < 1 || Number(minute) > 120) { setError('Minuto requerido (1-120)'); return; }
    setLoading(true);
    setError('');
    try {
      const ourTeam = match?.homeTeamId?.isOurTeam ? match.homeTeamId : match?.awayTeamId;
      await createMatchEvent(matchId, { type: 'substitution', minute: Number(minute), playerOutId, playerInId, teamId: String(ourTeam?._id) });
      handleClose();
    } catch (e) {
      setError(e?.response?.data?.message ?? 'Error al registrar el cambio');
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setPlayerOutId('');
    setPlayerInId('');
    setMinute('');
    setError('');
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Cambio"
      icon="swap_horiz"
      size="sm"
      actions={
        <>
          <Button variant="ghost" isDisabled={loading} onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" isLoading={loading} onClick={handleSubmit}>Registrar</Button>
        </>
      }
    >
      <div test-id="el-ms4b8u2x" className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-error/70 inline-block" />
            Sale
          </p>
          <SearchableSelect
            value={playerOutId}
            onChange={setPlayerOutId}
            options={playerOptions}
            placeholder="Jugador que sale..."
            error={!!error && !playerOutId}
          />
        </div>

        <div>
          <p className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success inline-block" />
            Entra
          </p>
          <SearchableSelect
            value={playerInId}
            onChange={setPlayerInId}
            options={playerOptions.filter((o) => o.value !== playerOutId)}
            placeholder="Jugador que entra..."
            error={!!error && !playerInId}
          />
        </div>

        <div>
          <p className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2">Minuto</p>
          <input
            type="number"
            min={1}
            max={120}
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className={`input input-bordered w-full ${error && !minute ? 'input-error' : ''}`}
            placeholder="Ej. 60"
          />
        </div>

        {error && <p className="text-error text-sm">{error}</p>}
      </div>
    </Modal>
  );
}
