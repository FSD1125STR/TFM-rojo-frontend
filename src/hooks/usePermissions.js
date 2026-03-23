import { useAuth } from "./useAuth";
import { hasPermission } from "../config/permissions";

export function usePermissions() {
  const { user } = useAuth();

  const checkPermission = (permission) => {
    if (!user) return false;

    if (user.role?.toLowerCase() === "administrador") return true;

    return hasPermission(user.role, permission);
  };

  return {
    checkPermission,
    user,
    role: user?.role,
  };
}
