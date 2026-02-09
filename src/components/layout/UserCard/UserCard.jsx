import PropTypes from 'prop-types';
import { Avatar } from '../../ui/Avatar/Avatar';
import { IconButton } from '../../ui/IconButton/IconButton';

export function UserCard({ user, variant = 'default', collapsed = false, onLogout }) {
  if (collapsed) {
    return (
      <div test-id="el-e7f8g9h0" className="flex flex-col items-center gap-2 py-2">
        <Avatar name={user.fullName} src={user.avatar} size="sm" />
        {onLogout && (
          <IconButton
            icon="logout"
            ariaLabel="Cerrar sesión"
            variant="ghost"
            size="sm"
            onClick={onLogout}
          />
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div test-id="el-e7f8g9h0" className="flex items-center gap-2 px-4 py-2">
        <Avatar name={user.fullName} src={user.avatar} size="sm" />
        <span className="text-sm font-medium truncate flex-1">{user.fullName}</span>
        {onLogout && (
          <IconButton
            icon="logout"
            ariaLabel="Cerrar sesión"
            variant="ghost"
            size="sm"
            onClick={onLogout}
          />
        )}
      </div>
    );
  }
  return (
    <div test-id="el-e7f8g9h0" className="flex items-center gap-3 px-4 py-3">
      <Avatar name={user.fullName} src={user.avatar} size="md" />
      <div className="flex flex-col min-w-0 flex-1">
        <span className="font-medium truncate">{user.fullName}</span>
        {user.club?.name && (
          <span className="text-xs text-base-content/60 truncate">{user.club.name}</span>
        )}
        <span className="text-xs text-base-content/60 truncate capitalize">
          {user.role}{user.category?.name && ` · ${user.category.name}`}
        </span>
      </div>
      {onLogout && (
        <IconButton
          icon="logout"
          ariaLabel="Cerrar sesión"
          variant="ghost"
          size="sm"
          onClick={onLogout}
        />
      )}
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    role: PropTypes.string,
    avatar: PropTypes.string,
    club: PropTypes.shape({
      name: PropTypes.string,
      shortName: PropTypes.string,
    }),
    category: PropTypes.shape({
      name: PropTypes.string,
      season: PropTypes.string,
    }),
  }).isRequired,
  variant: PropTypes.oneOf(['default', 'compact']),
  collapsed: PropTypes.bool,
  onLogout: PropTypes.func,
};
