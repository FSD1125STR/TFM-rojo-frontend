import { StatBoxProps } from './StatBox.props'

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
    <div test-id="el-s1t2b3x4" className="text-center">
      <div className={`text-3xl font-bold ${colorClasses[color]}`}>
        {value}
      </div>
      <div className="text-sm text-base-content/60 mt-1">{label}</div>
    </div>
  );
}

StatBox.propTypes = StatBoxProps
