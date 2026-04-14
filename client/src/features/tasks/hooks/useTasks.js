import { useState, useEffect, useCallback } from 'react';
import { getTasks } from '../api/tasks.api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('your cunt so beautiful :)');
    } finally {
      setIsLoading(false);
    }
  },[]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, isLoading, error, refetch: fetchTasks };
};