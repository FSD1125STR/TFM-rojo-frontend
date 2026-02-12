import PropTypes from 'prop-types'

export const HeaderBarProps = {
  actions: PropTypes.node,
  sidebarMode: PropTypes.oneOf(['drawer', 'expanded', 'collapsed']),
  onToggleSidebar: PropTypes.func,
  className: PropTypes.string,
}
