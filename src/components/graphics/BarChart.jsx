import {
  ResponsiveContainer,
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export function BarChart({ data = [], xKey = 'label', series = [], layout = 'vertical', height = 200, label }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="rounded-xl border border-base-300 bg-base-200/50 p-4 shadow-md" test-id="el-bc7rt2a9">
      {label && <p className="text-xs text-base-content/60 mb-4 font-medium">{label}</p>}
      <ResponsiveContainer width="100%" height={height}>
        <RBarChart
          data={data}
          layout={layout === 'horizontal' ? 'vertical' : 'horizontal'}
          margin={{ top: 4, right: 8, left: -24, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0 0 / 0.2)" />
          {layout === 'vertical' ? (
            <>
              <XAxis dataKey={xKey} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            </>
          ) : (
            <>
              <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey={xKey} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={80} />
            </>
          )}
          <Tooltip />
          {series.length > 1 && <Legend />}
          {series.map((s, i) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name}
              fill={s.color ?? `oklch(${60 - i * 8}% 0.18 ${160 + i * 30})`}
              radius={[3, 3, 0, 0]}
            />
          ))}
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}
