import { Button } from "../../../components/ui/Button";
import { Icon } from "../../../components/ui/Icon";
import { Divider } from "../../../components/ui/Divider";

export function DangerZone({ isActive, onToggleStatus, onDelete }) {
  return (
    <div
      className="card bg-base-100 border border-error/30 shadow-sm overflow-hidden"
      test-id="el-r4t5y6u7"
    >
      <div className="bg-error/5 p-4 border-b border-error/20 flex items-center gap-2 text-error font-bold">
        <Icon name="warning" />
        Zona de Peligro
      </div>
      <div className="card-body space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-1">Estado de la cuenta</h4>
          <p className="text-xs text-base-content/60 mb-3">
            {isActive
              ? "Desactivar al usuario impedirá que pueda iniciar sesión en el sistema."
              : "Activar al usuario le permitirá volver a acceder con sus credenciales."}
          </p>
          <Button
            variant={isActive ? "warning" : "success"}
            className="w-full btn-outline"
            onClick={onToggleStatus}
          >
            {isActive ? "Desactivar Usuario" : "Activar Usuario"}
          </Button>
        </div>

        <Divider />

        <div>
          <h4 className="font-semibold text-sm mb-1 text-error">
            Eliminar definitivamente
          </h4>
          <p className="text-xs text-base-content/60 mb-3">
            Se borrarán todos los registros asociados a este perfil. Esta acción
            es irreversible.
          </p>
          <Button variant="danger" className="w-full" onClick={onDelete}>
            Eliminar usuario
          </Button>
        </div>
      </div>
    </div>
  );
}
