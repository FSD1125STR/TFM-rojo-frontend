import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  getCallupByMatch as getMatchCallup,
  saveCallupPlayers as saveCallupPlayersService,
} from '../../../services/callupsService';
import { showToast, showErrorList } from '../../../utils/alerts';

const ERROR_MESSAGES = {
  REASON_REQUIRED: 'Hay jugadores no convocados sin motivo indicado',
  CALLUP_MIN_NOT_REACHED: 'Se necesitan al menos 11 jugadores convocados',
  CALLUP_LIMIT_EXCEEDED: 'Se ha superado el límite de 18 convocados',
  FORBIDDEN: 'No tienes permiso para modificar esta convocatoria',
};

export function useCallupDetail(matchId) {
  const [match, setMatch] = useState(null);
  const [callup, setCallup] = useState(null);
  const [players, setPlayers] = useState([]);
  const [savedPlayers, setSavedPlayers] = useState([]);
  const [maxPlayers, setMaxPlayers] = useState(18);
  const [minPlayers, setMinPlayers] = useState(11);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!matchId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getMatchCallup(matchId);
      setMatch(data.match);
      setCallup(data.callup);
      setPlayers(data.players);
      setSavedPlayers(data.players);
      setMaxPlayers(data.maxPlayers);
      setMinPlayers(data.minPlayers ?? 11);
    } catch (err) {
      const code = err.response?.data?.error;
      setError(code || err.message || 'Error al cargar la convocatoria');
    } finally {
      setLoading(false);
    }
  }, [matchId]);

  useEffect(() => {
    load();
  }, [load]);

  const isDirty = useMemo(() => {
    if (!players.length) return false;
    return players.some((p) => {
      if (p.isBlocked) return false;
      const saved = savedPlayers.find((sp) => sp.id === p.id);
      if (!saved) return false;
      return p.callupStatus !== saved.callupStatus || p.reasonCode !== saved.reasonCode;
    });
  }, [players, savedPlayers]);

  const movePlayer = useCallback((playerId, toColumn, reasonCode) => {
    setPlayers((curr) =>
      curr.map((p) => {
        if (p.id !== playerId) return p;
        return {
          ...p,
          callupStatus: toColumn,
          reasonCode: toColumn === 'notCalled' ? reasonCode : null,
        };
      })
    );
  }, []);

  const saveAllPlayers = useCallback(async () => {
    const toSave = players
      .filter((p) => p.callupStatus !== null)
      .map((p) => ({
        playerId: p.id,
        status: p.callupStatus,
        ...(p.callupStatus === 'notCalled' && p.reasonCode && { reasonCode: p.reasonCode }),
      }));

    setSaving(true);
    try {
      await saveCallupPlayersService(callup._id, toSave);
      setSavedPlayers(players);
      showToast('Convocatoria guardada correctamente');
    } catch (err) {
      const errorCode = err.response?.data?.error;
      if (errorCode === 'PLAYER_NOT_AVAILABLE') {
        const problematic = players.filter(
          (p) => p.callupStatus === 'called' && (p.playerStatus === 'LESIONADO' || p.playerStatus === 'SANCIONADO')
        );
        const items = problematic.map(
          (p) => `${p.fullName} — ${p.playerStatus === 'LESIONADO' ? 'lesionado' : 'sancionado'}`
        );
        showErrorList('Jugadores no disponibles', items.length ? items : ['Hay un jugador no disponible entre los convocados']);
      } else {
        const msg = ERROR_MESSAGES[errorCode] || 'Error al guardar la convocatoria';
        showToast(msg, 'error');
      }
    } finally {
      setSaving(false);
    }
  }, [callup, players]);

  const discardChanges = useCallback(() => {
    setPlayers(savedPlayers);
  }, [savedPlayers]);

  const availablePlayers = players.filter((p) => p.callupStatus === null);
  const calledPlayers = players.filter((p) => p.callupStatus === 'called');
  const notCalledPlayers = players.filter((p) => p.callupStatus === 'notCalled');
  const calledCount = calledPlayers.length;

  return {
    match,
    callup,
    availablePlayers,
    calledPlayers,
    notCalledPlayers,
    calledCount,
    maxPlayers,
    minPlayers,
    loading,
    saving,
    error,
    isDirty,
    movePlayer,
    saveAllPlayers,
    discardChanges,
    reload: load,
  };
}
