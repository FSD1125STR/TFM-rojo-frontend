import { useEffect, useState } from 'react';
import { getLiveMatchById } from '../../../../services/liveMatchService';
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
      .catch(setError)
      .finally(() => setIsLoading(false));
    return () => leaveMatch();
  }, [matchId]); // eslint-disable-line react-hooks/exhaustive-deps

  return { match, liveStatus, lastEvent, isLoading, error };
}
