import { Navigate, Outlet } from 'react-router-dom';
import { usePermissions } from '../hooks/usePermissions';
import { useLiveMatch } from '../hooks/useLiveMatchContext';

export function LiveProtectedRoute() {
  const { checkPermission, role } = usePermissions();
  const { hasLiveMatch } = useLiveMatch();

  const canAccess =
    checkPermission('live.update') ||
    (role === 'direccion' && hasLiveMatch);

  if (!canAccess) return <Navigate to="/" replace />;
  return <Outlet />;
}
