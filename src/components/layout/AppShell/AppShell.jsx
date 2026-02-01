import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../Sidebar/Sidebar'
import { HeaderBar } from '../HeaderBar/HeaderBar'
import { useSidebar } from '../../../hooks/useSidebar'

export function AppShell({ title, breadcrumbs, actions }) {
  const { mode, drawerOpen, toggleSidebar, closeDrawer } = useSidebar()

  return (
    <div test-id="el-q9r0s1t2" className="drawer lg:drawer-open">
      <input
        type="checkbox"
        id="app-drawer"
        className="drawer-toggle"
        checked={drawerOpen}
        readOnly
      />

      <div className="drawer-content flex flex-col min-h-screen">
        <HeaderBar
          title={title}
          breadcrumbs={breadcrumbs}
          actions={actions}
          sidebarMode={mode}
          onToggleSidebar={toggleSidebar}
        />

        <main className="flex-1 p-6 bg-base-200">
          <Outlet />
        </main>
      </div>

      <Sidebar
        mode={mode}
        drawerOpen={drawerOpen}
        onNavigate={closeDrawer}
      />
    </div>
  )
}

AppShell.propTypes = {
  title: PropTypes.string,
  breadcrumbs: PropTypes.array,
  actions: PropTypes.node,
}
