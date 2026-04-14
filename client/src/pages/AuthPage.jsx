import { useState } from 'react';
import styles from './AuthPage.module.css';
import { LoginForm } from '../features/auth/components/LoginForm';
import { RegisterForm } from '../features/auth/components/registerForm';

export const AuthPage = () => {
  const [authMode, setAuthMode] = useState('login');

  return (
    <div className={styles.pageContainer}>
      <div className={styles.authBox}>
        {authMode == 'login' ? <LoginForm /> : <RegisterForm />}

        <div className={styles.toggleContainer}>
          {authMode === 'login' ? (
            <button className={styles.toggleBtn} onClick={() => setAuthMode('register')}>Register</button>
          ) : (
            <button className={styles.toggleBtn} onClick={() => setAuthMode('login')}>Login</button>
          )}
        </div>
      </div>
    </div>
  );
};
