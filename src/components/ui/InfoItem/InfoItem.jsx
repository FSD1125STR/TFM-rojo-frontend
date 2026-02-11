import PropTypes from "prop-types";

export function InfoItem({
  icon,
  label,
  value,
  badge,
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="material-symbols-outlined text-base-content/50 text-xl mt-0.5">
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-sm text-base-content/60">{label}</span>
        {badge ? (
          <span className="mt-1">{badge}</span>
        ) : (
          <span className="font-medium">{value}</span>
        )}
      </div>
    </div>
  );
}

InfoItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  badge: PropTypes.node,
};
