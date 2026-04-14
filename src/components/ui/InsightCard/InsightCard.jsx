import { InsightCardProps } from './InsightCard.props';
import { Icon } from '../Icon';

const CONFIG = {
  warning: { cls: 'alert alert-warning', icon: 'warning' },
  info:    { cls: 'alert alert-info',    icon: 'info' },
  success: { cls: 'alert alert-success', icon: 'check_circle' },
};

export function InsightCard({ type = 'info', title, description }) {
  const { cls, icon } = CONFIG[type] ?? CONFIG.info;
  return (
    <div className={cls} test-id="el-in8c4rd1">
      <Icon name={icon} />
      <div>
        <p className="font-semibold text-sm">{title}</p>
        {description && <p className="text-xs opacity-80">{description}</p>}
      </div>
    </div>
  );
}

InsightCard.propTypes = InsightCardProps;
