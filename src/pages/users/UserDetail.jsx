import { useParams } from 'react-router-dom';

export function UserDetail() {
  const { id } = useParams();

  return (
    <div test-id="el-u7s3r9d5">
      <h2 className="text-xl font-semibold mb-4">Detalle del Usuario</h2>
      <p className="text-base-content/70">ID: {id}</p>
    </div>
  );
}
