import {
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { DEFAULT_COLORS } from './chartColors';

export function PieChart({ data = [], colors = DEFAULT_COLORS, innerRadius = 0, height = 200, label, showLegend = true }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="rounded-xl border border-base-300 bg-base-200/50 p-4 shadow-md" test-id="el-pc9ie2h7">
      {label && <p className={`text-xs mb-4 font-medium ${showLegend ? 'text-base-content/60' : 'text-base-content/80'}`}>{label}</p>}
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
          {showLegend && <Legend />}
        </RPieChart>
      </ResponsiveContainer>
    </div>
  );
}
