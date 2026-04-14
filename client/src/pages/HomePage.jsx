import { TaskBoard } from '../features/tasks/components/TaskBoard';
import { useAuthStore } from '../stores/useAuthStore';

export const HomePage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div style={{ padding: '40px 20px' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '900px', margin: '0 auto 30px' }}>
        <h2>Hello, {user.username}! 👋</h2>
        <button 
          onClick={logout} 
          style={{ color: 'red', fontWeight: 'bold' }}
        >
          Exit
        </button>
      </header>

      <TaskBoard />
      
    </div>
  );
};