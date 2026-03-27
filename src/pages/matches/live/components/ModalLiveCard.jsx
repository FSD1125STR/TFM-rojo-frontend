import { useState, useEffect } from 'react';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import { SearchableSelect } from '../../../../components/ui/SearchableSelect';
import { createMatchEvent } from '../../../../services/matchesService';

export function ModalLiveCard({ isOpen, onClose, matchId, match, players, cardType, currentMinute }) {
  const [playerId, setPlayerId] = useState('');
  const [minute, setMinute] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) setMinute(currentMinute != null ? String(currentMinute) : '');
  }, [isOpen, currentMinute]);

  const isYellow = cardType === 'yellow_card';
  const title = isYellow ? 'Tarjeta amarilla' : 'Tarjeta roja';
  const playerOptions = players.map((p) => ({ value: p.id, label: p.fullName }));

  async function handleSubmit() {
    if (!playerId) { setError('Selecciona un jugador'); return; }
    if (!minute || Number(minute) < 1 || Number(minute) > 120) { setError('Minuto requerido (1-120)'); return; }
    setLoading(true);
    setError('');
    try {
      const ourTeam = match?.homeTeamId?.isOurTeam ? match.homeTeamId : match?.awayTeamId;
      await createMatchEvent(matchId, { type: cardType, minute: Number(minute), playerId, teamId: String(ourTeam?._id) });
      handleClose();
    } catch (e) {
      setError(e?.response?.data?.message ?? 'Error al registrar la tarjeta');
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setPlayerId('');
    setMinute('');
    setError('');
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      size="sm"
      actions={
        <>
          <Button variant="ghost" isDisabled={loading} onClick={handleClose}>Cancelar</Button>
          <Button variant={isYellow ? 'primary' : 'danger'} isLoading={loading} onClick={handleSubmit}>
            Registrar
          </Button>
        </>
      }
    >
      <div test-id="el-mc4r7d1x" className="flex flex-col gap-4">
        {/* Card color indicator */}
        <div className="flex items-center gap-2">
          <span className={`w-5 h-7 rounded-sm ${isYellow ? 'bg-warning' : 'bg-error'}`} />
          <span className="text-sm text-base-content/60">{title}</span>
        </div>

        <div>
          <p className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2">Jugador</p>
          <SearchableSelect
            value={playerId}
            onChange={setPlayerId}
            options={playerOptions}
            placeholder="Seleccionar jugador..."
            error={!!error && !playerId}
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
            placeholder="Ej. 45"
          />
        </div>

        {error && <p className="text-error text-sm">{error}</p>}
      </div>
    </Modal>
  );
}
