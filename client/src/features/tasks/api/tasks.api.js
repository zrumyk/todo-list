import { apiClient } from '../../../lib/axios';

export const getTasks = async () => {
  const response = await apiClient.get('/tasks/all');
  return response.data?.data || response.data; 
};

export const createTask = async (taskData) => {
  const response = await apiClient.post('/tasks/create', taskData);
  return response.data?.data || response.data;
};

export const updateTask = async (id, status) => {
  const response = await apiClient.patch(`/tasks/update/${id}`, { status });
  return response.data?.data || response.data;
};

export const deleteTask = async (id) => {
  const response = await apiClient.delete(`/tasks/delete/${id}`);
  return response.data?.data || response.data;
};