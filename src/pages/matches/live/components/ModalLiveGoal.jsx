import { useState, useEffect } from 'react';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import { SearchableSelect } from '../../../../components/ui/SearchableSelect';
import { createMatchEvent } from '../../../../services/matchesService';

export function ModalLiveGoal({ isOpen, onClose, matchId, match, players, currentMinute }) {
  const [team, setTeam] = useState('home');
  const [playerId, setPlayerId] = useState('');
  const [minute, setMinute] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) setMinute(currentMinute != null ? String(currentMinute) : '');
  }, [isOpen, currentMinute]);

  const homeName = match?.homeTeamId?.name || 'Local';
  const awayName = match?.awayTeamId?.name || 'Visitante';
  const playerOptions = players.map((p) => ({ value: p.id, label: p.fullName }));

  async function handleSubmit() {
    if (team === 'home' && !playerId) { setError('Selecciona un jugador'); return; }
    if (!minute || Number(minute) < 1 || Number(minute) > 120) { setError('Minuto requerido (1-120)'); return; }
    setLoading(true);
    setError('');
    try {
      const teamId = team === 'home'
        ? String(match?.homeTeamId?._id)
        : String(match?.awayTeamId?._id);
      await createMatchEvent(matchId, {
        type: 'goal',
        minute: Number(minute),
        teamId,
        ...(team === 'home' ? { playerId } : { isOpponentGoal: true }),
      });
      handleClose();
    } catch (e) {
      setError(e?.response?.data?.message ?? 'Error al registrar el gol');
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setTeam('home');
    setPlayerId('');
    setMinute('');
    setError('');
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Registrar gol"
      icon="sports_soccer"
      size="sm"
      actions={
        <>
          <Button variant="ghost" isDisabled={loading} onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" isLoading={loading} onClick={handleSubmit}>Registrar</Button>
        </>
      }
    >
      <div test-id="el-g7n2p4w8" className="flex flex-col gap-4">
        {/* Team toggle */}
        <div>
          <p className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2">Equipo</p>
          <div className="flex rounded-xl border border-base-300 overflow-hidden">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold transition-colors ${team === 'home' ? 'bg-primary text-primary-content' : 'bg-base-100 text-base-content/60 hover:bg-base-200'}`}
              onClick={() => { setTeam('home'); setPlayerId(''); }}
            >
              {homeName}
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold transition-colors ${team === 'away' ? 'bg-error text-error-content' : 'bg-base-100 text-base-content/60 hover:bg-base-200'}`}
              onClick={() => { setTeam('away'); setPlayerId(''); }}
            >
              {awayName}
            </button>
          </div>
        </div>

        {/* Player selector — only for home team */}
        {team === 'home' && (
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
        )}

        {/* Minute */}
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
