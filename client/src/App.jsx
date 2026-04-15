import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { useAuthStore } from './stores/useAuthStore';
import { useEffect } from 'react';
import { getMe } from './features/auth/api/auth.api';

const App = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      try {
        const data = await getMe();
        console.log(data);
        login(data, token);
      } catch (error) {
        console.log(error);
        logout();
      }
    };

    initAuth();
  });

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
