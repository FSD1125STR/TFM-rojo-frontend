import { useHeader } from '../../hooks/useHeader';
import { Button } from '../../components/ui/Button/Button';
import { usePermissions } from '../../hooks/usePermissions';

export function CallupsList() {
  const { checkPermission } = usePermissions();

  useHeader({
    title: 'Convocatorias',
    breadcrumbs: [
      { label: 'Inicio', to: '/' },
      { label: 'Convocatorias' }
    ],
    actions: checkPermission('callups.create') ? <Button variant="primary">Crear convocatoria</Button> : null
  });

  return (
    <div test-id="el-b8c9d0e1">
      <p className="text-base-content/70">Gestión de convocatorias</p>
    </div>
  );
}
