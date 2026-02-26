import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';

export function ProtectedRoute({ permission }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { checkPermission } = usePermissions();

  if (isLoading) {
    return (
      <div test-id="el-p6r8t2c4" className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (permission && !checkPermission(permission)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
