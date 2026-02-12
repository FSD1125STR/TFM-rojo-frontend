import PropTypes from 'prop-types'

export const SidebarProps = {
  mode: PropTypes.oneOf(['expanded', 'collapsed', 'drawer']),
  drawerOpen: PropTypes.bool,
  onNavigate: PropTypes.func,
  user: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    role: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onLogout: PropTypes.func,
  className: PropTypes.string,
}
