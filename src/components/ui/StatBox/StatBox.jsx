import PropTypes from "prop-types";

export function StatBox({
  value,
  label,
  color = "default",
}) {
  const colorClasses = {
    default: "text-base-content",
    yellow: "text-warning",
    red: "text-error",
    green: "text-success",
  };

  return (
    <div className="text-center">
      <div className={`text-3xl font-bold ${colorClasses[color]}`}>
        {value}
      </div>
      <div className="text-sm text-base-content/60 mt-1">{label}</div>
    </div>
  );
}

StatBox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["default", "yellow", "red", "green"]),
};
