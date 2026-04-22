import { Navigate, Outlet } from 'react-router-dom';
import { usePermissions } from '../hooks/usePermissions';
import { useLiveMatch } from '../hooks/useLiveMatchContext';

export function LiveProtectedRoute() {
  const { checkPermission, role } = usePermissions();
  const { hasLiveMatch, isLoadingLive } = useLiveMatch();

  // Esperar el fetch inicial antes de decidir si hay acceso
  if (isLoadingLive) return null;

  const canAccess =
    checkPermission('live.update') ||
    (role === 'direccion' && hasLiveMatch);

  if (!canAccess) return <Navigate to="/" replace />;
  return <Outlet />;
}
