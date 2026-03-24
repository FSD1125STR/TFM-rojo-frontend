import { useEffect, useState } from 'react';
import { getMatchEvents } from '../../../../services/matchesService';
import { useLiveMatch } from '../../../../hooks/useLiveMatchContext';

export function useMatchEvents(matchId) {
  const { lastEvent } = useLiveMatch();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!matchId) return;
    getMatchEvents(matchId)
      .then(setEvents)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [matchId]);

  useEffect(() => {
    const event = lastEvent?.event;
    if (event && String(event.matchId) === String(matchId)) {
      setEvents((prev) => [...prev, event]);
    }
  }, [lastEvent, matchId]);

  return { events, isLoading, error };
}
