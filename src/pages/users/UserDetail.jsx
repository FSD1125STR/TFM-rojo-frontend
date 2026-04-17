import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHeader } from "../../hooks/useHeader";
import { useAuth } from "../../hooks/useAuth";
import * as userService from "../../services/userService";
import { PageHeader } from "../../components/ui/PageHeader";
import { Badge } from "../../components/ui/Badge";
import { Icon } from "../../components/ui/Icon";
import { InfoItem } from "../../components/ui/InfoItem";
import { Divider } from "../../components/ui/Divider";
import {
  showConfirm,
  showToast,
  showError,
  getApiErrorMsg,
} from "../../utils/alerts";
import { DangerZone } from "./components/DangerZone";
import { UserPermissions } from "./components/UserPermissions";
import { ROLE_CONFIGS } from "./data/roleConfigs";

export function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useHeader({
    title: "Perfil de Usuario",
    breadcrumbs: [
      { label: "Inicio", to: "/" },
      { label: "Usuarios", to: "/usuarios" },
      { label: "Detalle" },
    ],
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await userService.getUserById(id);
        setUser(data);
      } catch (err) {
        showError(getApiErrorMsg(err, "No se pudo cargar el perfil"));
        navigate("/usuarios");
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [id, navigate]);

  const handleToggleStatus = async () => {
    const action = user.isActive ? "desactivar" : "activar";
    const ok = await showConfirm(
      `¿Quieres ${action} el acceso de ${user.fullName}?`,
    );
    if (!ok) return;

    try {
      const result = await userService.toggleUserStatus(id);
      setUser((prev) => ({ ...prev, isActive: result.isActive }));
      showToast(`Estado actualizado con éxito`);
    } catch (err) {
      showError(getApiErrorMsg(err, "Error al cambiar estado"));
    }
  };

  const handleDelete = async () => {
    const ok = await showConfirm(
      `¿Eliminar a ${user.fullName}? Esta acción es irreversible.`,
    );
    if (!ok) return;

    try {
      await userService.deleteUser(id);
      showToast("Usuario eliminado del club");
      navigate("/usuarios");
    } catch (err) {
      showError(getApiErrorMsg(err, "No se pudo eliminar"));
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  const roleStyle = ROLE_CONFIGS[user.role?.toLowerCase()] || {
    variant: "neutral",
    icon: "person",
  };

  return (
    <div className="space-y-6" test-id="el-u7s3r9d5">
      <PageHeader
        title={user.fullName}
        subtitle="Información detallada del integrante del club"
        showBack
        onBack={() => navigate("/usuarios")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Icon name="contact_mail" className="text-primary" />
                  Datos de Cuenta
                </h3>
                <Badge variant={user.isActive ? "success" : "error"}>
                  {user.isActive ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <InfoItem icon="mail" label="Email" value={user.email} />
                <InfoItem
                  icon="phone"
                  label="Teléfono"
                  value={user.phone || "No registrado"}
                />

                <InfoItem
                  icon="admin_panel_settings"
                  label="Rol"
                  badge={
                    <Badge
                      variant={roleStyle.variant}
                      icon={roleStyle.icon}
                      size="sm"
                      width="150px"
                      pill={false}
                    >
                      <span className="capitalize">{user.role}</span>
                    </Badge>
                  }
                />

                <InfoItem
                  icon="category"
                  label="Categoría"
                  value={user.categoryId?.name || "Administración Central"}
                />
              </div>
            </div>
          </div>

          <UserPermissions role={user.role} />
        </div>

        <div className="space-y-6">
          {isAdmin ? (
            <DangerZone
              isActive={user.isActive}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
          ) : (
            <div className="alert bg-base-200 border-base-300 text-sm italic">
              <Icon name="lock" size="sm" />
              Solo los administradores pueden gestionar estados o bajas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
