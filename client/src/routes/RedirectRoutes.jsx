import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  return <Outlet />;
};

export const PublicRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
};
