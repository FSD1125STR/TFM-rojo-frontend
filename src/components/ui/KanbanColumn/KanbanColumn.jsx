import { Icon } from '../Icon';
import { KanbanColumnProps } from './KanbanColumn.props';

const variantStyles = {
  default: {
    header: 'bg-base-200',
    border: 'border-base-300',
    isOver: 'border-primary bg-primary/5',
  },
  success: {
    header: 'bg-success/10',
    border: 'border-success/30',
    isOver: 'border-success bg-success/10',
  },
  error: {
    header: 'bg-error/10',
    border: 'border-error/30',
    isOver: 'border-error bg-error/10',
  },
};

export function KanbanColumn({ title, count, total, icon, variant = 'default', isOver = false, children, className = '' }) {
  const styles = variantStyles[variant] || variantStyles.default;

  return (
    <div
      test-id="el-k4n8b1c2"
      className={`flex flex-col rounded-2xl border-2 transition-colors duration-150 ${
        isOver ? styles.isOver : styles.border
      } ${className}`}
    >
      <div className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl ${styles.header}`}>
        {icon && <Icon name={icon} className="text-lg text-base-content/60" />}
        <span className="font-semibold text-sm flex-1">{title}</span>
        {count != null && (
          <span className="text-xs font-bold tabular-nums text-base-content/60">
            {count}{total != null ? `/${total}` : ''}
          </span>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 min-h-[120px]">
        {children}
      </div>
    </div>
  );
}

KanbanColumn.propTypes = KanbanColumnProps;
