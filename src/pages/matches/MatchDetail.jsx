import { useParams } from 'react-router-dom';

export function MatchDetail() {
  const { id } = useParams();

  return (
    <div test-id="el-match-detail">
      <h2 className="text-xl font-semibold mb-4">Detalle del Partido</h2>
      <p className="text-base-content/70">ID: {id}</p>
    </div>
  );
}
