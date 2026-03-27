import { useMatchTimer, getHalfDuration } from '../hooks/useMatchTimer';

export function MatchMinute({ match }) {
  const minute = useMatchTimer(match._id, match.liveStatus, getHalfDuration(match.categoryId?.name));
  if (minute === null) return null;
  return <span className="text-sm font-mono font-bold text-success">{minute}&apos;</span>;
}
