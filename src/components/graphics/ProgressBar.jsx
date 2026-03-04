import { ProgressBarProps } from './ProgressBar.props';

export function ProgressBar({ label, value, subtitle, color = '#1e6b3c', animated = false }) {
  return (
    <div test-id="el-pb7x2k9m" className="rounded-xl border border-base-300 bg-base-200/50 p-3 flex flex-col gap-2 shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm text-base-content/60">{label}</span>
        <span className="text-sm font-bold text-base-content">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-base-300 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            background: color,
            transition: animated ? 'width 1s ease-out' : undefined,
          }}
        />
      </div>
      {subtitle && <span className="text-xs text-base-content/50">{subtitle}</span>}
    </div>
  );
}

ProgressBar.propTypes = ProgressBarProps;
