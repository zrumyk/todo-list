import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth.api';
import { useAuthStore } from '../../../stores/useAuthStore';
import styles from './AuthForm.module.css';

export const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(username, email, password);
      login(data.userData, data.token);
      navigate('/', { replace: true });
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Register | {import.meta.env.VITE_APP_STATUS}</h2>
      {error && <div className={styles.errorBox}>{error}</div>}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Username</label>
        <input
          type="text"
          placeholder="username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          placeholder="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Password</label>
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.submitBtn}>
        Sign up
      </button>
    </form>
  );
};
