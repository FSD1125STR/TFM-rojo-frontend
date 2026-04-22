import { useEffect, useState } from 'react';
import { getMatchEvents } from '../../../../services/matchesService';
import { useLiveMatch } from '../../../../hooks/useLiveMatchContext';

const SYSTEM_TYPES = new Set(['match_start', 'half_time', 'full_time']);

function sortKey(e) {
  if (e.type === 'match_start') return -Infinity;
  if (e.type === 'full_time') return Infinity;
  return e.minute;
}

function dedupeAndSort(events) {
  // Para eventos de sistema, conservar solo el más reciente (mayor _id → mayor timestamp)
  const systemLatest = {};
  for (const e of events) {
    if (!SYSTEM_TYPES.has(e.type)) continue;
    if (!systemLatest[e.type] || String(e._id) > String(systemLatest[e.type]._id)) {
      systemLatest[e.type] = e;
    }
  }
  const deduped = events.filter((e) => !SYSTEM_TYPES.has(e.type) || systemLatest[e.type] === e);
  return deduped.sort((a, b) => sortKey(a) - sortKey(b));
}

export function useMatchEvents(matchId) {
  const { lastEvent } = useLiveMatch();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!matchId) return;
    getMatchEvents(matchId)
      .then((data) => setEvents(dedupeAndSort(data)))
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [matchId]);

  useEffect(() => {
    const event = lastEvent?.event;
    if (event && String(event.matchId) === String(matchId)) {
      setEvents((prev) => dedupeAndSort([...prev, event]));
    }
  }, [lastEvent, matchId]);

  return { events, isLoading, error };
}
