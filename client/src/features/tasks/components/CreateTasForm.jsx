import { useState } from 'react';
import { createTask } from '../api/tasks.api';
import styles from './Tasks.module.css';

export const CreateTaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setIsLoading(true);
      await createTask({ title, description });
      setTitle('');
      setDescription('');
      onTaskCreated();
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.createForm}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          disabled={isLoading}
          required
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
          disabled={isLoading}
        />
        <button type="submit" className={styles.addBtn} disabled={isLoading}>
          {isLoading ? 'adding...' : '+ add'}
        </button>
      </form>
      <p>{error}</p>
    </div>
  );
};
