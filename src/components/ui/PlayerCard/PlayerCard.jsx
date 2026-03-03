import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { PlayerCardProps } from './PlayerCard.props';

export function PlayerCard({ player, isBlocked = false, reasonBadge, className = '' }) {
  const { fullName, photoUrl, position, dorsal } = player;

  return (
    <div
      test-id="el-p1y2c4r3"
      className={`flex items-center gap-3 p-3 rounded-xl bg-base-100 border border-base-300 shadow-sm select-none ${
        isBlocked ? 'opacity-60' : ''
      } ${className}`}
    >
      <Avatar src={photoUrl || undefined} name={fullName} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{fullName}</p>
        {position && <p className="text-xs text-base-content/60">{position}</p>}
      </div>
      {reasonBadge && (
          <div className="flex-1 flex items-center justify-center">{reasonBadge}</div>
      )}
      {dorsal != null && (
        <Badge variant="default" size="xs" shape="card" className="shrink-0">
          {dorsal}
        </Badge>
      )}
    </div>
  );
}

PlayerCard.propTypes = PlayerCardProps;
