import PropTypes from 'prop-types'
import { Avatar } from '../../ui/Avatar/Avatar'

export function UserCard({ user, variant = 'default', collapsed = false }) {
  if (collapsed) {
    return (
      <div test-id="el-e7f8g9h0" className="flex justify-center py-2">
        <Avatar name={user.name} src={user.avatar} size="sm" />
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div test-id="el-e7f8g9h0" className="flex items-center gap-2 px-4 py-2">
        <Avatar name={user.name} src={user.avatar} size="sm" />
        <span className="text-sm font-medium truncate">{user.name}</span>
      </div>
    )
  }

  return (
    <div test-id="el-e7f8g9h0" className="flex items-center gap-3 px-4 py-3">
      <Avatar name={user.name} src={user.avatar} size="md" />
      <div className="flex flex-col min-w-0">
        <span className="font-medium truncate">{user.name}</span>
        <span className="text-xs text-base-content/60 truncate">{user.role}</span>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  variant: PropTypes.oneOf(['default', 'compact']),
  collapsed: PropTypes.bool,
}
