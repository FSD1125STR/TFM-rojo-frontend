import PropTypes from 'prop-types'
import { Icon } from '../Icon/Icon'

export function DataTableActions({ actions, row }) {
  const visibleActions = actions.filter(action =>
    !action.show || action.show(row)
  )

  if (visibleActions.length === 0) return null

  return (
    <div className="dropdown dropdown-end mr-2.5">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-sm btn-square"
        onClick={(e) => e.stopPropagation()}
      >
        <Icon name="more_vert" size="sm" />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box shadow-lg w-44 z-50 p-2"
      >
        {visibleActions.map((action, index) => (
          <li key={index}>
            <a
              className={action.variant === 'danger' ? 'text-error' : ''}
              onClick={(e) => {
                e.stopPropagation()
                action.onClick(row)
                document.activeElement?.blur()
              }}
            >
              {action.icon && <Icon name={action.icon} size="sm" />}
              {action.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

DataTableActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.oneOf(['default', 'danger']),
      show: PropTypes.func,
    })
  ).isRequired,
  row: PropTypes.object.isRequired,
}
