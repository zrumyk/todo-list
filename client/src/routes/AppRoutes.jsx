import { AuthPage } from '../pages/AuthPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './RedirectRoutes';
import { HomePage } from '../pages/HomePage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path='auth' element={<AuthPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<HomePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
