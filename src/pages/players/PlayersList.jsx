import { useHeader } from '../../hooks/useHeader';
import { Button } from '../../components/ui/Button/Button';

export function PlayersList() {
  useHeader({
    title: 'Jugadores',
    breadcrumbs: [
      { label: 'Inicio', to: '/' },
      { label: 'Jugadores' }
    ],
    actions: <Button variant="primary">Crear jugador</Button>
  });

  return (
    <div test-id="el-f3a8b2c1">
      <p className="text-base-content/70">Gestión de jugadores del equipo</p>
    </div>
  );
}
