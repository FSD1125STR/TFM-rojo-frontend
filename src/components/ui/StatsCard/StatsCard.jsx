import { StatsCardProps } from './StatsCard.props';
import { Icon } from '../Icon';

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  iconElement,
  variant = "default",
  layout = "horizontal",
  className = "",
}) {
  const variantClasses = {
    default: "bg-base-200 text-base-content",
    primary: "bg-primary/10 text-primary border border-primary/20",
    secondary: "bg-secondary/10 text-secondary border border-secondary/20",
    accent: "bg-accent text-accent-content border border-accent/30",
    success: "bg-success/10 text-success border border-success/20",
    warning: "bg-warning/10 text-warning border border-warning/20",
    error: "bg-error/10 text-error border border-error/20",
    purple: "bg-purple-500/10 text-purple-400 border border-purple-500/25",
    blue: "bg-blue-500/10 text-blue-400 border border-blue-500/25",
  };

  const verticalVariantClasses = {
    default: "bg-base-200 text-base-content border-base-300",
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    accent: "bg-accent text-accent-content border-accent/30",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/50",
    error: "bg-error/10 text-error border-error/40",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/25",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/25",
  };

  if (layout === "vertical") {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 shadow-sm ${verticalVariantClasses[variant]} ${className}`}
        test-id="el-s1t2c3d4"
      >
        {iconElement ?? (icon && <Icon name={icon} size="sm" className="opacity-50" />)}
        <span className="text-2xl font-bold leading-none">{value}</span>
        <span className="text-[11px] opacity-60 text-center leading-tight">{title}</span>
      </div>
    );
  }

  return (
    <div
      className={`card rounded-xl p-5 ${variantClasses[variant]} ${className}`}
      test-id="el-s1t2c3d4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium opacity-80">{title}</span>
          <span className="text-3xl font-bold">{value}</span>
          {subtitle && (
            <span className="text-xs opacity-60 mt-1">{subtitle}</span>
          )}
        </div>
        {icon && (
          <div className="text-3xl opacity-60">
            <Icon name={icon} size="lg" className="opacity-60" />
          </div>
        )}
      </div>
    </div>
  );
}

StatsCard.propTypes = StatsCardProps;
