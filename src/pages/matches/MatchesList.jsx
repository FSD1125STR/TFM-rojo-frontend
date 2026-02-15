import { useHeader } from '../../hooks/useHeader';
import { Button } from '../../components/ui/Button/Button';
import { usePermissions } from '../../hooks/usePermissions';

export function MatchesList() {
  const { checkPermission } = usePermissions();

  useHeader({
    title: 'Partidos',
    breadcrumbs: [
      { label: 'Inicio', to: '/' },
      { label: 'Partidos' }
    ],
    actions: checkPermission('matches.create') ? <Button variant="primary">Crear partido</Button> : null
  });

  return (
    <div test-id="el-d4e5f6a7">
      <p className="text-base-content/70">Calendario y resultados de partidos</p>
    </div>
  );
}
