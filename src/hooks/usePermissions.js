import { useAuth } from './useAuth';
import { hasPermission } from '../config/permissions';

export function usePermissions() {
  const { user } = useAuth();
  const checkPermission = (permission) => hasPermission(user?.role, permission);
  return { checkPermission, role: user?.role };
}
