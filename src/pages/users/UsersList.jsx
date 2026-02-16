import { useHeader } from '../../hooks/useHeader';
import { Button } from '../../components/ui/Button/Button';
import { usePermissions } from '../../hooks/usePermissions';

export function UsersList() {
  const { checkPermission } = usePermissions();

  useHeader({
    title: 'Usuarios',
    breadcrumbs: [
      { label: 'Inicio', to: '/' },
      { label: 'Usuarios' }
    ],
    actions: checkPermission('users.create') ? <Button variant="primary">Crear usuario</Button> : null
  });

  return (
    <div test-id="el-a2b3c4d5">
      <p className="text-base-content/70">Gestión de usuarios del sistema</p>
    </div>
  );
}
