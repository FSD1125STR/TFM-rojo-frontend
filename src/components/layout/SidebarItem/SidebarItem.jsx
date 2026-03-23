import { NavLink } from 'react-router-dom';
import { SidebarItemProps } from './SidebarItem.props';
import { Icon } from '../../ui/Icon/Icon';

export function SidebarItem({ icon, label, to, collapsed = false, onClick, showLiveDot = false }) {
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
        <span className="relative inline-flex">
          <Icon name={icon} size="sm" />
          {showLiveDot && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-error animate-pulse" />
          )}
        </span>
        {!collapsed && <span>{label}</span>}
      </NavLink>
    </li>
  );
}

SidebarItem.propTypes = SidebarItemProps;
