import { useHeader } from '../hooks/useHeader';

export function Dashboard() {
  useHeader({
    title: 'Dashboard',
    breadcrumbs: [],
    actions: null
  });

  return (
    <div test-id="el-u3v4w5x6">
      <p className="text-base-content/70">Bienvenido a FootMind</p>
    </div>
  );
}
