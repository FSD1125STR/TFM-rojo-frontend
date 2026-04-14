import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useHeader } from '../hooks/useHeader';
import { StatsCard } from '../components/ui/StatsCard';
import { InsightCard } from '../components/ui/InsightCard';
import { QuickActions } from '../components/ui/QuickActions';
import { EventLineChart, BarChart, PieChart } from '../components/graphics';
import {
  getDelegadoDashboard,
  getEntrenadorDashboard,
  getDireccionDashboard,
  getAdminDashboard,
} from '../services/dashboardService';

const SERVICE_MAP = {
  delegado: getDelegadoDashboard,
  entrenador: getEntrenadorDashboard,
  direccion: getDireccionDashboard,
  administrador: getAdminDashboard,
};

function ChartRenderer({ chart }) {
  if (!chart || !chart.labels) return null;

  const { type, labels, series = [], label } = chart;

  if (type === 'line') {
    if (series.length === 1) {
      const data = labels.map((l, i) => ({ x: l, y: series[0].data[i] }));
      return <EventLineChart data={data} xKey="x" yKey="y" label={label ?? series[0].name} />;
    }
    // Multi-series line: build combined data object and pass raw to BarChart as fallback
    const data = labels.map((l, i) =>
      series.reduce((acc, s) => ({ ...acc, [s.name]: s.data[i] }), { label: l })
    );
    const seriesMapped = series.map((s) => ({ key: s.name, name: s.name }));
    return <BarChart data={data} xKey="label" series={seriesMapped} layout="vertical" label={label} />;
  }

  if (type === 'bar' || type === 'bar-horizontal') {
    const data = labels.map((l, i) =>
      series.reduce((acc, s) => ({ ...acc, [s.name]: s.data[i] }), { label: l })
    );
    const seriesMapped = series.map((s) => ({ key: s.name, name: s.name }));
    const layout = type === 'bar-horizontal' ? 'horizontal' : 'vertical';
    return <BarChart data={data} xKey="label" series={seriesMapped} layout={layout} label={label} />;
  }

  if (type === 'pie' || type === 'donut') {
    const data = labels.map((l, i) => ({ name: l, value: series[0]?.data[i] ?? 0 }));
    const innerRadius = type === 'donut' ? '55%' : 0;
    return <PieChart data={data} innerRadius={innerRadius} label={label} showLegend={chart.showLegend !== false} />;
  }

  return null;
}

export function Dashboard() {
  useHeader({ title: 'Dashboard', breadcrumbs: [] });
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.role) return;
    const fetchFn = SERVICE_MAP[user.role];
    if (!fetchFn) { setLoading(false); return; }
    setLoading(true);
    setData(null);
    setError(null);
    fetchFn()
      .then(setData)
      .catch(() => setError('Error al cargar el dashboard'))
      .finally(() => setLoading(false));
  }, [user?.role]);

  if (loading) {
    return (
      <div className="p-6 space-y-6" test-id="el-db5k3l0n">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-24 rounded-xl" />)}
        </div>
        <div className="skeleton h-48 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="skeleton h-40 rounded-xl" />
          <div className="skeleton h-40 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6" test-id="el-db3rr0r1">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="p-6 space-y-6" test-id="el-db5h8rd1">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {data.kpis.map((kpi) => (
          <StatsCard
            key={kpi.id}
            title={kpi.label}
            value={kpi.value}
            subtitle={kpi.subtitle}
            icon={kpi.icon}
            variant={kpi.variant ?? 'default'}
          />
        ))}
      </div>

      {data.mainChart && <ChartRenderer chart={data.mainChart} />}

      {data.secondaryCharts?.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.secondaryCharts.map((chart, i) => (
            <ChartRenderer key={i} chart={chart} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.insights?.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-base-content/70">Insights</h3>
            {data.insights.map((insight, i) => (
              <InsightCard key={i} {...insight} />
            ))}
          </div>
        )}
        {data.quickActions?.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-base-content/70">Acciones rápidas</h3>
            <QuickActions actions={data.quickActions} />
          </div>
        )}
      </div>
    </div>
  );
}
