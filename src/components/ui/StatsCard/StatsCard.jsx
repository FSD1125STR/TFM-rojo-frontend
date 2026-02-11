import PropTypes from "prop-types";

const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  variant = "default",
  className = "",
}) => {
  const variantClasses = {
    default: "bg-base-200 text-base-content",
    primary: "bg-primary/10 text-primary border border-primary/20",
    secondary: "bg-secondary/10 text-secondary border border-secondary/20",
    accent: "bg-accent/20 text-accent-content border border-accent/30",
    success: "bg-success/10 text-success border border-success/20",
    warning: "bg-warning/10 text-warning border border-warning/20",
    error: "bg-error/10 text-error border border-error/20",
  };

  return (
    <div
      className={`card rounded-xl p-5 ${variantClasses[variant]} ${className}`}
      data-testid="stats-card"
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
            <span className="material-symbols-outlined">{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.node,
  icon: PropTypes.string,
  variant: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "accent",
    "success",
    "warning",
    "error",
  ]),
  className: PropTypes.string,
};

export default StatsCard;
