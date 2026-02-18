import { Icon } from '../Icon/Icon';
import { DataTableActionsProps } from './DataTableActions.props';

export function DataTableActions({ actions, row, title = 'Acciones' }) {
  const visibleActions = actions.filter(action =>
    !action.show || action.show(row)
  );

  if (visibleActions.length === 0) return null;

  const normalActions = visibleActions.filter(a => a.variant !== 'danger');
  const dangerActions = visibleActions.filter(a => a.variant === 'danger');

  const handleAction = (e, action) => {
    e.stopPropagation();
    action.onClick(row);
    document.activeElement?.blur();
  };

  return (
    <div test-id="el-dta4d5e6" className="dropdown dropdown-end">
      <button
        test-id="el-dta7f8g9"
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-sm btn-square"
        onClick={(e) => e.stopPropagation()}
      >
        <Icon name="more_vert" size="sm" />
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-xl shadow-lg w-48 border border-base-300 z-50"
      >
        {title && (
          <li className="menu-title">
            <span className="font-semibold text-sm">{title}</span>
          </li>
        )}

        {normalActions.map((action, index) => (
          <li key={index}>
            <button
              className="flex items-center gap-3 text-sm"
              onClick={(e) => handleAction(e, action)}
            >
              {action.icon && (
                <Icon name={action.icon} size="sm" className="text-base-content/70" />
              )}
              <span>{action.label}</span>
            </button>
          </li>
        ))}

        {dangerActions.length > 0 && normalActions.length > 0 && (
          <div className="divider my-0"></div>
        )}

        {dangerActions.map((action, index) => (
          <li key={index}>
            <button
              className="flex items-center gap-3 text-sm text-error hover:bg-error/10"
              onClick={(e) => handleAction(e, action)}
            >
              {action.icon && (
                <Icon name={action.icon} size="sm" />
              )}
              <span>{action.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

DataTableActions.propTypes = DataTableActionsProps;

export default DataTableActions;
