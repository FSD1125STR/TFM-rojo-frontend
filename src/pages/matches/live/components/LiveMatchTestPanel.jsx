import { useState, useEffect } from 'react';
import { getPlayers } from '../../../../services/playersService';
import { createMatchEvent, updateLiveStatus } from '../../../../services/matchesService';
import { Button } from '../../../../components/ui/Button';
import { Icon } from '../../../../components/ui/Icon';

export function LiveMatchTestPanel({ matchId }) {
  const [players, setPlayers] = useState([]);
  const [playerOut, setPlayerOut] = useState('');
  const [playerIn, setPlayerIn] = useState('');
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [minute, setMinute] = useState(1);
  const [loading, setLoading] = useState(null);
  const [log, setLog] = useState([]);

  useEffect(() => {
    getPlayers()
      .then((data) => {
        const list = Array.isArray(data) ? data : (data?.players ?? []);
        setPlayers(list);
        if (list.length > 0) setSelectedPlayerId(list[0].id);
        if (list.length > 0) setPlayerOut(list[0].id);
        if (list.length > 1) setPlayerIn(list[1].id);
      })
      .catch((e) => addLog(`Error cargando jugadores: ${e.message}`, false));
  }, [matchId]);

  const addLog = (label, ok) =>
    setLog((prev) => [{ label, ok, ts: new Date().toLocaleTimeString() }, ...prev].slice(0, 8));

  const fire = async (label, fn) => {
    setLoading(label);
    try {
      await fn();
      addLog(label, true);
    } catch (e) {
      addLog(`${label}: ${e?.response?.data?.message ?? e.message}`, false);
    } finally {
      setLoading(null);
    }
  };

  const btn = (label, fn, icon) => (
    <Button
      size="sm"
      variant="ghost"
      className="border border-base-300 gap-1 text-xs"
      onClick={() => fire(label, fn)}
      disabled={!!loading}
    >
      {loading === label
        ? <span className="loading loading-spinner loading-xs" />
        : <Icon name={icon} size="sm" />}
      {label}
    </Button>
  );

  const playerSelect = (label, value, onChange) => (
    <label className="flex flex-col gap-0.5 text-xs flex-1 min-w-28">
      <span className="opacity-60">{label}</span>
      <select
        className="select select-xs select-bordered"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {players.length === 0 && <option value="">Cargando…</option>}
        {players.map((p) => (
          <option key={p.id} value={p.id}>{`${p.firstName ?? ''} ${p.lastName ?? ''}`.trim() || p.id}</option>
        ))}
      </select>
    </label>
  );

  return (
    <div test-id="el-t3stpn1x" className="border border-warning/40 rounded-lg p-3 mb-4 bg-warning/5 text-xs">
      <p className="font-bold text-warning mb-3 flex items-center gap-1">
        <Icon name="science" size="sm" /> PANEL DE PRUEBAS — solo visible en dev
      </p>

      {/* Jugador + minuto para GOAL/YELLOW/RED */}
      <p className="opacity-60 mb-1 uppercase tracking-wide" style={{ fontSize: '10px' }}>GOAL / YELLOW / RED</p>
      <div className="flex gap-2 mb-3 flex-wrap items-end">
        {playerSelect('Jugador', selectedPlayerId, setSelectedPlayerId)}
        <label className="flex flex-col gap-0.5 text-xs">
          <span className="opacity-60">Min</span>
          <input
            type="number" min={1} max={120} value={minute}
            onChange={(e) => setMinute(Number(e.target.value))}
            className="input input-xs input-bordered w-14"
          />
        </label>
      </div>

      {/* Jugadores para SUB */}
      <p className="opacity-60 mb-1 uppercase tracking-wide" style={{ fontSize: '10px' }}>SUB</p>
      <div className="flex gap-2 mb-3 flex-wrap items-end">
        {playerSelect('Sale', playerOut, setPlayerOut)}
        {playerSelect('Entra', playerIn, setPlayerIn)}
      </div>

      {/* Botones */}
      <div className="flex flex-wrap gap-2 mb-3">
        {btn('MATCH_LIVE', () => updateLiveStatus(matchId, { liveStatus: 'FIRST_HALF' }), 'cell_tower')}
        {btn('GOAL', () => createMatchEvent(matchId, { type: 'GOAL', minute, playerId: selectedPlayerId }), 'sports_soccer')}
        {btn('YELLOW', () => createMatchEvent(matchId, { type: 'YELLOW', minute, playerId: selectedPlayerId }), 'square')}
        {btn('RED', () => createMatchEvent(matchId, { type: 'RED', minute, playerId: selectedPlayerId }), 'square')}
        {btn('SUB', () => createMatchEvent(matchId, { type: 'SUB', minute, playerOutId: playerOut, playerInId: playerIn }), 'swap_horiz')}
      </div>

      {/* Log */}
      {log.length > 0 && (
        <ul className="space-y-0.5">
          {log.map((entry, i) => (
            <li key={i} className={`flex gap-1 items-start ${entry.ok ? 'text-success' : 'text-error'}`}>
              <Icon name={entry.ok ? 'check_circle' : 'cancel'} size="sm" />
              <span className="opacity-60">{entry.ts}</span>
              <span>{entry.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
