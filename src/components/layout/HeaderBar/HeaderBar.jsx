import PropTypes from 'prop-types'
import { IconButton } from '../../ui/IconButton/IconButton'
import { ThemeToggle } from '../../ui/ThemeToggle/ThemeToggle'
import { PageTitle } from '../PageTitle/PageTitle'
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import { HeaderActions } from '../HeaderActions/HeaderActions'

const sidebarIcons = {
  drawer: { icon: 'menu', label: 'Abrir menú' },
  expanded: { icon: 'dock_to_right', label: 'Colapsar sidebar' },
  collapsed: { icon: 'left_panel_open', label: 'Expandir sidebar' },
}

export function HeaderBar({
  title,
  breadcrumbs = [],
  actions,
  sidebarMode = 'drawer',
  onToggleSidebar,
  className = '',
}) {
  const { icon, label } = sidebarIcons[sidebarMode] || sidebarIcons.drawer

  return (
    <header test-id="el-m5n6o7p8" className={`navbar h-16 bg-base-100 border-b border-base-300 px-4 ${className}`}>
      <div className="flex-none">
        <IconButton
          icon={icon}
          ariaLabel={label}
          onClick={onToggleSidebar}
        />
      </div>

      <div className="flex-1 flex items-center gap-4 ml-4">
        {title && <PageTitle>{title}</PageTitle>}
        {breadcrumbs.length > 0 && (
          <>
            <span className="text-base-content/30">|</span>
            <Breadcrumbs items={breadcrumbs} variant="compact" />
          </>
        )}
      </div>

      <div className="flex-none flex items-center gap-2">
        {actions && <HeaderActions>{actions}</HeaderActions>}
        <div className="flex items-center gap-3 bg-base-200 [html[data-theme=dark]_&]:bg-base-300 rounded-lg px-3 py-1.5">
          <div className="indicator">
            <span className="indicator-item badge badge-error badge-xs text-white">1</span>
            <IconButton
              icon="notifications"
              ariaLabel="Notificaciones"
              variant="ghost"
              size="sm"
            />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

HeaderBar.propTypes = {
  title: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
    })
  ),
  actions: PropTypes.node,
  sidebarMode: PropTypes.oneOf(['drawer', 'expanded', 'collapsed']),
  onToggleSidebar: PropTypes.func,
  className: PropTypes.string,
}
