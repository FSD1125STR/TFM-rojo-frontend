import { AppLogo } from '../AppLogo/AppLogo';
import { SidebarProps } from './Sidebar.props'
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { UserCard } from '../UserCard/UserCard';
import { Divider } from '../../ui/Divider/Divider';
import { menuItems } from '../../../data/menuItems';
import { useAuth } from '../../../hooks/useAuth';

export function Sidebar({
  mode = 'expanded',
  drawerOpen = false,
  onNavigate,
  user: userProp,
  onLogout: onLogoutProp,
  className = ''
}) {
  const { user: authUser, logout } = useAuth();
  const user = userProp || authUser;
  const handleLogout = onLogoutProp || logout;
  const isCollapsed = mode === 'collapsed';
  const isDrawer = mode === 'drawer';

  const sidebarWidth = isCollapsed ? 'w-24' : 'w-64';

  const sidebarContent = (
    <div test-id="el-i1j2k3l4" className={`flex flex-col h-full bg-base-100 border-r border-base-300 ${isDrawer ? 'w-64' : sidebarWidth}`}>
      <AppLogo collapsed={isCollapsed} />

      <nav className="flex-1 overflow-y-auto px-2">
        <ul className="menu gap-1 w-full">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              collapsed={isCollapsed}
              onClick={isDrawer ? onNavigate : undefined}
            />
          ))}
        </ul>
      </nav>

      {user && (
        <div className="mt-auto">
          <Divider className="my-0" />
          <UserCard user={user} collapsed={isCollapsed} onLogout={handleLogout} />
        </div>
      )}
    </div>
  );

  if (isDrawer) {
    return (
      <>
        <input
          type="checkbox"
          id="sidebar-drawer"
          className="drawer-toggle"
          checked={drawerOpen}
          readOnly
        />
        <div className="drawer-side z-50">
          <button
            type="button"
            className="drawer-overlay"
            onClick={onNavigate}
            aria-label="Cerrar menú"
          />
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <aside className={`${sidebarWidth} ${className}`}>
      {sidebarContent}
    </aside>
  );
}

Sidebar.propTypes = SidebarProps
