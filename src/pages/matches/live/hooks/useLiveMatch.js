import { useEffect, useState } from 'react';
import { getLiveMatchById } from '../../../../services/liveMatchService';
import { getMatchById } from '../../../../services/matchesService';
import { useLiveMatch as useLiveMatchContext } from '../../../../hooks/useLiveMatchContext';

export function useLiveMatch(matchId) {
  const { joinMatch, leaveMatch, liveStatus, lastEvent } = useLiveMatchContext();
  const [match, setMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!matchId) return;
    joinMatch(matchId);
    getLiveMatchById(matchId)
      .then(({ match: m }) => setMatch(m))
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 404) {
          return getMatchById(matchId).then((m) => setMatch(m));
        }
        throw err;
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
    return () => leaveMatch();
  }, [matchId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!lastEvent || lastEvent.homeScore === null || lastEvent.homeScore === undefined) return;
    setMatch((prev) => prev ? { ...prev, homeScore: lastEvent.homeScore, awayScore: lastEvent.awayScore } : prev);
  }, [lastEvent]);

  return { match, liveStatus, lastEvent, isLoading, error };
}
