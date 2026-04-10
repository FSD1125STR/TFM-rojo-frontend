import {
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const DEFAULT_COLORS = [
  'oklch(48% 0.05 160)',
  'oklch(65% 0.06 160)',
  'oklch(75% 0.18 75)',
  'oklch(60% 0.22 25)',
  'oklch(65% 0.2 145)',
  'oklch(55% 0.15 200)',
];

export function PieChart({ data = [], colors = DEFAULT_COLORS, innerRadius = 0, height = 200, label }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="rounded-xl border border-base-300 bg-base-200/50 p-4 shadow-md" test-id="el-pc9ie2h7">
      {label && <p className="text-xs text-base-content/60 mb-4 font-medium">{label}</p>}
      <ResponsiveContainer width="100%" height={height}>
        <RPieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius="70%"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RPieChart>
      </ResponsiveContainer>
    </div>
  );
}
