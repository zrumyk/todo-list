import { apiClient } from '../../../lib/axios';

export const getMe = async () => {
  const response = await apiClient.get('/auth/me');

  return response.data;
}

export const loginUser = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (username, email, password) => {
  const response = await apiClient.post('auth/register', {
    username,
    email,
    password,
  });

  return response.data;
};
