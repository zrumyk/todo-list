import { create } from 'zustand';
import * as Sentry from "@sentry/react";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')),
  isAuthenticated: !!localStorage.getItem('token'),

  login: (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    set({
      user: JSON.parse(localStorage.getItem('user')),
      isAuthenticated: true,
    });
    Sentry.setUser({ id: userData.id, email: userData.email, username: userData.username });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      user: null,
      isAuthenticated: false,
    });
    Sentry.setUser(null);
  },
}));
