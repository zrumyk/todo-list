import { AuthPage } from '../pages/AuthPage';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './RedirectRoutes';
import { HomePage } from '../pages/HomePage';
import { useEffect } from 'react';
import posthog from 'posthog-js';

export const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    posthog.capture('$pageview');
  }, [location]);

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="auth" element={<AuthPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
