import { useState, useEffect, useCallback } from 'react';
import { getCallupByMatch, saveCallupPlayers } from '../../../../services/callupsService';
import { showToast } from '../../../../utils/alerts';

export function useMatchLineup(matchId) {
  const [callupId, setCallupId] = useState(null);
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lineupMap, setLineupMap] = useState({});

  useEffect(() => {
    if (!matchId) return;
    setLoading(true);
    getCallupByMatch(matchId)
      .then((data) => {
        setCallupId(data.callup?._id ?? null);
        setAllPlayers(data.players ?? []);
        const map = {};
        (data.players ?? []).forEach((p) => {
          map[p.id] = p.lineupRole ?? null;
        });
        setLineupMap(map);
      })
      .catch(() => {
        // Sin convocatoria: el panel no se muestra (callupId === null)
      })
      .finally(() => setLoading(false));
  }, [matchId]);

  const calledPlayers = allPlayers
    .filter((p) => p.callupStatus === 'called')
    .map((p) => ({ ...p, lineupRole: lineupMap[p.id] ?? null }));

  const starterCount = calledPlayers.filter((p) => p.lineupRole === 'starter').length;

  const toggleStarter = useCallback((playerId) => {
    setLineupMap((prev) => {
      const calledIds = new Set(allPlayers.filter((p) => p.callupStatus === 'called').map((p) => p.id));
      const calledEntries = Object.entries(prev).filter(([id]) => calledIds.has(id));
      const count = calledEntries.filter(([, r]) => r === 'starter').length;
      const role = prev[playerId];
      const next = role ? null : (count < 11 ? 'starter' : 'substitute');
      const newMap = { ...prev, [playerId]: next };
      if (!next) return newMap;
      const updatedCalled = Object.entries(newMap).filter(([id]) => calledIds.has(id));
      const newStarters = updatedCalled.filter(([, r]) => r === 'starter').length;
      const newSubs = updatedCalled.filter(([, r]) => r === 'substitute').length;
      const unassigned = updatedCalled.filter(([, r]) => !r);
      const subsNeeded = calledIds.size - 11;
      if (unassigned.length > 0 && newStarters === 11) {
        unassigned.forEach(([id]) => { newMap[id] = 'substitute'; });
      } else if (unassigned.length > 0 && subsNeeded > 0 && newSubs === subsNeeded) {
        unassigned.forEach(([id]) => { newMap[id] = 'starter'; });
      }
      return newMap;
    });
  }, [allPlayers]);

  const confirmLineup = useCallback(async () => {
    if (!callupId) return;
    const toSave = allPlayers
      .filter((p) => p.callupStatus !== null)
      .map((p) => ({
        playerId: p.id,
        status: p.callupStatus,
        ...(p.callupStatus === 'notCalled' && p.reasonCode && { reasonCode: p.reasonCode }),
        ...(p.callupStatus === 'called' && { lineupRole: lineupMap[p.id] ?? null }),
      }));

    setSaving(true);
    try {
      await saveCallupPlayers(callupId, toSave);
      showToast('Alineación guardada correctamente');
    } catch {
      showToast('Error al guardar la alineación', 'error');
    } finally {
      setSaving(false);
    }
  }, [callupId, allPlayers, lineupMap]);

  return {
    callupId,
    calledPlayers,
    starterCount,
    isValid: starterCount === 11,
    saving,
    loading,
    toggleStarter,
    confirmLineup,
  };
}
