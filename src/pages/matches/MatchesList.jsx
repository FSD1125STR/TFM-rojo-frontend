import { useHeader } from '../../hooks/useHeader';
import { Button } from '../../components/ui/Button/Button';

export function MatchesList() {
  useHeader({
    title: 'Partidos',
    breadcrumbs: [
      { label: 'Inicio', to: '/' },
      { label: 'Partidos' }
    ],
    actions: <Button variant="primary">Crear partido</Button>
  });

  return (
    <div test-id="el-d4e5f6a7">
      <p className="text-base-content/70">Calendario y resultados de partidos</p>
    </div>
  );
}
