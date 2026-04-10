import { useMatchTimer, getHalfDuration } from '../hooks/useMatchTimer';
import { useLiveMatch } from '../../../../hooks/useLiveMatchContext';

export function MatchMinute({ match }) {
  const { matchStartTimestamps } = useLiveMatch();
  const minute = useMatchTimer(match._id, match.liveStatus, getHalfDuration(match.categoryId?.name), matchStartTimestamps.firstHalfStartAt, matchStartTimestamps.secondHalfStartAt);
  if (minute === null) return null;
  return <span className="text-sm font-mono font-bold text-success">{minute}&apos;</span>;
}
