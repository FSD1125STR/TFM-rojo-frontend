import { Icon } from '../Icon';
import { InfoItemProps } from './InfoItem.props';

export function InfoItem({
  icon,
  label,
  value,
  badge,
  href,
}) {
  return (
    <div test-id="el-f1i2t3m4" className="flex items-start gap-3">
      <Icon name={icon} size="sm" className="text-base-content/50 mt-0.5" />
      <div className="flex flex-col">
        <span className="text-sm text-base-content/60">{label}</span>
        {badge ? (
          <span className="mt-1">{badge}</span>
        ) : href ? (
          <a href={href} className="font-medium text-primary hover:underline leading-tight">{value}</a>
        ) : (
          <span className="font-medium">{value}</span>
        )}
      </div>
    </div>
  );
}

InfoItem.propTypes = InfoItemProps;
