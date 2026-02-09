import { useHeader } from '../hooks/useHeader';

export function LiveMatch() {
  useHeader({
    title: 'Partido en directo',
    breadcrumbs: [],
    actions: null
  });

  return (
    <div test-id="el-r7s8t9u0">
      <p className="text-base-content/70">Seguimiento del partido en tiempo real</p>
    </div>
  );
}
