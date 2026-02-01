import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Icon } from '../../ui/Icon/Icon'

export function SidebarItem({ icon, label, to, collapsed = false, onClick }) {
  return (
    <li test-id="el-a3b4c5d6">
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `${isActive ? 'menu-item-active bg-primary text-primary-content' : ''} ${collapsed ? 'justify-center' : ''}`
        }
        title={collapsed ? label : undefined}
      >
        <Icon name={icon} size="sm" />
        {!collapsed && <span>{label}</span>}
      </NavLink>
    </li>
  )
}

SidebarItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  collapsed: PropTypes.bool,
  onClick: PropTypes.func,
}
