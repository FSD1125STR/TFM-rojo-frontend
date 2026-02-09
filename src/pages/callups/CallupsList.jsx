import { useHeader } from '../../hooks/useHeader';
import { Button } from '../../components/ui/Button/Button';

export function CallupsList() {
  useHeader({
    title: 'Convocatorias',
    breadcrumbs: [
      { label: 'Inicio', to: '/' },
      { label: 'Convocatorias' }
    ],
    actions: <Button variant="primary">Crear convocatoria</Button>
  });

  return (
    <div test-id="el-b8c9d0e1">
      <p className="text-base-content/70">Gestión de convocatorias</p>
    </div>
  );
}
