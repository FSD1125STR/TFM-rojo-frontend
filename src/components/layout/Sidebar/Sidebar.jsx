import PropTypes from 'prop-types'
import { AppLogo } from '../AppLogo/AppLogo'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { UserCard } from '../UserCard/UserCard'
import { Divider } from '../../ui/Divider/Divider'
import { menuItems } from '../../../data/menuItems'
import { mockUser } from '../../../data/mockUser'

export function Sidebar({
  mode = 'expanded',
  drawerOpen = false,
  onNavigate,
  className = ''
}) {
  const isCollapsed = mode === 'collapsed'
  const isDrawer = mode === 'drawer'

  const sidebarWidth = isCollapsed ? 'w-24' : 'w-64'

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

      <div className="mt-auto">
        <Divider className="my-0" />
        <UserCard user={mockUser} collapsed={isCollapsed} />
      </div>
    </div>
  )

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
          <label
            htmlFor="sidebar-drawer"
            className="drawer-overlay"
            onClick={onNavigate}
          ></label>
          {sidebarContent}
        </div>
      </>
    )
  }

  return (
    <aside className={`${sidebarWidth} ${className}`}>
      {sidebarContent}
    </aside>
  )
}

Sidebar.propTypes = {
  mode: PropTypes.oneOf(['expanded', 'collapsed', 'drawer']),
  drawerOpen: PropTypes.bool,
  onNavigate: PropTypes.func,
  className: PropTypes.string,
}
