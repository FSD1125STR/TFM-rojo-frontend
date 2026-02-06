import { useParams } from 'react-router-dom';

export function PlayerDetail() {
  const { id } = useParams();

  return (
    <div test-id="el-player-detail">
      <h2 className="text-xl font-semibold mb-4">Detalle del Jugador</h2>
      <p className="text-base-content/70">ID: {id}</p>
    </div>
  );
}
