import { Icon } from "../../../components/ui/Icon";

const PERMISSIONS_MAP = {
  administrador: [
    { label: "Gestión total del club", status: true },
    { label: "Crear y editar cualquier usuario", status: true },
    { label: "Eliminar registros históricos", status: true },
    { label: "Acceso a facturación y pagos", status: true },
  ],
  entrenador: [
    { label: "Ver jugadores de su categoría", status: true },
    { label: "Crear convocatorias", status: true },
    { label: "Modificar alineaciones", status: true },
    { label: "Gestionar bajas y borrados", status: false },
  ],
  direccion: [
    { label: "Lectura de todos los equipos", status: true },
    { label: "Ver estadísticas globales", status: true },
    { label: "Crear o editar contenido", status: false },
    { label: "Gestionar personal", status: false },
  ],
  delegado: [
    { label: "Gestionar sanciones de su categoría", status: true },
    { label: "Controlar asistencia", status: true },
    { label: "Editar datos de jugadores", status: false },
  ],
};

export function UserPermissions({ role }) {
  const permissions = PERMISSIONS_MAP[role] || [];

  return (
    <div
      className="card bg-base-100 border border-base-300 shadow-sm"
      test-id="el-p8r2m4s9"
    >
      <div className="card-body">
        <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
          <Icon name="verified_user" className="text-primary" />
          Permisos del Rol
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {permissions.map((perm, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg"
            >
              <Icon
                name={perm.status ? "check_circle" : "cancel"}
                className={
                  perm.status ? "text-success" : "text-base-content/30"
                }
                size="sm"
                aria-hidden="true"
              />
              <span className={`text-sm ${!perm.status && "opacity-50"}`}>
                <span className="sr-only">{perm.status ? "Permitido: " : "Denegado: "}</span>
                {perm.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
