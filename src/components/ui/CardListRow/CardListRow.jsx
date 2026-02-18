import { Icon } from '../Icon/Icon';
import { Badge } from '../Badge/Badge';
import { IconButton } from '../IconButton/IconButton';
import { DataTableActions } from '../DataTableActions/DataTableActions';
import { CardListRowProps } from './CardListRow.props';

const variantClasses = {
  default: 'bg-base-200 border border-base-300',
  white: 'bg-white border border-base-300',
};

const paddingClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function CardListRow({
  title,
  badges = [],
  meta = [],
  children,
  onClick,
  variant = 'default',
  padding = 'md',
  actions = [],
  actionsMode = 'menu',
  row,
  className = '',
}) {
  const base = 'rounded-xl transition-colors';
  const clickable = onClick ? 'cursor-pointer hover:bg-base-300/50' : '';

  const classes = [
    base,
    variantClasses[variant],
    paddingClasses[padding],
    clickable,
    className,
  ].filter(Boolean).join(' ');

  const hasMeta = meta.length > 0;

  const Tag = onClick ? 'button' : 'div';

  const renderActions = () => {
    if (actions.length > 0 && actionsMode === 'buttons') {
      return (
        <div className="flex items-center gap-1">
          {actions.filter(a => !a.show || a.show(row)).map((action, i) => (
            <IconButton
              key={i}
              icon={action.icon}
              size="sm"
              variant={action.variant === 'danger' ? 'danger' : 'ghost'}
              ariaLabel={action.label}
              title={action.label}
              onClick={(e) => { e.stopPropagation(); action.onClick(row); }}
            />
          ))}
        </div>
      );
    }
    if (actions.length > 0) {
      return <DataTableActions actions={actions} row={row} />;
    }
    return null;
  };

  return (
    <Tag
      test-id="el-r3w7k9m2"
      className={`${classes} ${onClick ? 'w-full text-left' : ''}`}
      {...(onClick && { type: 'button', onClick })}
    >
      <div className="flex items-stretch gap-4">
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="text-lg font-semibold text-base-content m-0 mb-2">{title}</h3>
          )}

          {hasMeta && (
            <div className="flex items-center gap-4 text-sm text-base-content/50 mb-3 flex-wrap">
              {meta.map((item) => (
                <span key={item.text || item.icon} className="flex items-center gap-1">
                  {item.icon && <Icon name={item.icon} size="sm" />}
                  {item.text}
                </span>
              ))}
            </div>
          )}

          {children}
        </div>
        <div className="flex flex-col items-end justify-between shrink-0">
          {badges.length > 0 && (
            <div className="flex items-center gap-2">
              {badges.map((badge, i) => (
                <Badge
                  key={i}
                  variant={badge.variant}
                  size={badge.size || 'sm'}
                  icon={badge.icon}
                  outline={badge.outline}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}
          {renderActions()}
        </div>
      </div>
    </Tag>
  );
}

CardListRow.propTypes = CardListRowProps;
