import { NavLink } from 'react-router-dom'
import { SidebarItemProps } from './SidebarItem.props'
import { Icon } from '../../ui/Icon/Icon'

export function SidebarItem({ icon, label, to, collapsed = false, onClick }) {
  return (
    <li test-id="el-a3b4c5d6">
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `${isActive ? 'menu-item-active bg-accent text-accent-content font-semibold' : ''} ${collapsed ? 'justify-center' : ''}`
        }
        title={collapsed ? label : undefined}
      >
        <Icon name={icon} size="sm" />
        {!collapsed && <span>{label}</span>}
      </NavLink>
    </li>
  )
}

SidebarItem.propTypes = SidebarItemProps
