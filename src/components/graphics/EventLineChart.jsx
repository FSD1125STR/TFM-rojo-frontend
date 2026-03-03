import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';

export function EventLineChart({
  data,
  xKey = 'x',
  yKey = 'y',
  lineColor = '#6366f1',
  yDomain,
  yTicks,
  referenceY,
  height = 160,
  label,
  getDotColor,
  getDotStroke,
  renderTooltip,
  legend = [],
}) {
  if (!data || data.length === 0) return null;

  return (
    <div className="rounded-xl border border-base-300 bg-base-200/50 p-4 shadow-md">
      {label && <p className="text-xs text-base-content/60 mb-4 font-medium">{label}</p>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0 0 / 0.2)" />
          {referenceY !== undefined && (
            <ReferenceLine y={referenceY} stroke="currentColor" strokeDasharray="3 3" strokeOpacity={0.2} />
          )}
          <XAxis dataKey={xKey} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis
            domain={yDomain}
            ticks={yTicks}
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              if (renderTooltip) {
                return (
                  <div className="bg-base-100 border border-base-300 rounded-lg px-2 py-1 text-xs shadow">
                    {renderTooltip(payload[0].payload)}
                  </div>
                );
              }
              return (
                <div className="bg-base-100 border border-base-300 rounded-lg px-2 py-1 text-xs shadow">
                  <p>{payload[0].value}</p>
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke={lineColor}
            strokeWidth={2}
            dot={({ cx, cy, payload }) => {
              const fill = getDotColor ? getDotColor(payload) : lineColor;
              const stroke = getDotStroke ? getDotStroke(payload) : 'none';
              const r = stroke !== 'none' ? 5 : 4;
              return <circle key={`dot-${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={2} />;
            }}
            activeDot={({ cx, cy, payload }) => {
              const fill = getDotColor ? getDotColor(payload) : lineColor;
              const stroke = getDotStroke ? getDotStroke(payload) : 'none';
              return <circle key={`active-${cx}-${cy}`} cx={cx} cy={cy} r={6} fill={fill} stroke={stroke} strokeWidth={2} />;
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      {legend.length > 0 && (
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          {legend.map((item) => (
            <span key={item.label} className="inline-flex items-center gap-1.5 text-xs text-base-content/40">
              <svg width="10" height="10">
                <circle
                  cx="5" cy="5"
                  r={item.stroke && item.stroke !== 'none' ? 3 : 4}
                  fill={item.fill}
                  stroke={item.stroke && item.stroke !== 'none' ? item.stroke : undefined}
                  strokeWidth={item.stroke && item.stroke !== 'none' ? 2 : 0}
                />
              </svg>
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
