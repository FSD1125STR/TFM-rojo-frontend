import { useParams } from 'react-router-dom';

export function CallupDetail() {
  const { id } = useParams();

  return (
    <div test-id="el-c4l2u8p6">
      <h2 className="text-xl font-semibold mb-4">Detalle de la Convocatoria</h2>
      <p className="text-base-content/70">ID: {id}</p>
    </div>
  );
}
