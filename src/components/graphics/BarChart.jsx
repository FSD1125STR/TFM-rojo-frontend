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
import { DEFAULT_COLORS } from './chartColors';

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
          <CartesianGrid strokeDasharray="3 3" stroke="#00000020" />
          {layout === 'vertical' ? (
            <>
              <XAxis dataKey={xKey} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} domain={[0, 'auto']} />
            </>
          ) : (
            <>
              <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} domain={[0, 'auto']} />
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
              fill={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
              radius={[3, 3, 0, 0]}
            />
          ))}
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}
