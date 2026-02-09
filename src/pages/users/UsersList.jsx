import { useHeader } from '../../hooks/useHeader';
import { Button } from '../../components/ui/Button/Button';

export function UsersList() {
  useHeader({
    title: 'Usuarios',
    breadcrumbs: [
      { label: 'Inicio', to: '/' },
      { label: 'Usuarios' }
    ],
    actions: <Button variant="primary">Crear usuario</Button>
  });

  return (
    <div test-id="el-a2b3c4d5">
      <p className="text-base-content/70">Gestión de usuarios del sistema</p>
    </div>
  );
}
