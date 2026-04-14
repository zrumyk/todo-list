import { useTasks } from '../hooks/useTasks';
import { CreateTaskForm } from './CreateTasForm';
import { deleteTask, updateTask } from '../api/tasks.api';
import styles from './Tasks.module.css';

const TaskItem = ({ task, onRefresh }) => {
  const handleStatus = async () => {
    const newStatus = task.status === 'TODO' ? 'COMPLETED' : 'TODO';
    await updateTask(task.id, newStatus);
    onRefresh();
  };

  const handleDelete = async () => {
    if (window.confirm('Delete?')) {
      await deleteTask(task.id);
      onRefresh();
    }
  };

  return (
    <div className={`${styles.taskCard} ${task.status === 'COMPLETED' ? styles.completed : ''}`}>
      <div className={styles.taskInfo}>
        <h4>{task.title}</h4>
        {task.description && <p>{task.description}</p>}
      </div>
      <div className={styles.taskActions}>
        <button onClick={handleStatus} className={styles.statusBtn}>
          {task.status === 'TODO' ? '✔' : '↩️'}
        </button>
        <button onClick={handleDelete} className={styles.deleteBtn}>❌</button>
      </div>
    </div>
  );
};

export const TaskBoard = () => {
  const { tasks, isLoading, error, refetch } = useTasks();

  if (isLoading) return <div className={styles.loader}></div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const todoTasks = tasks.filter(t => t.status === 'TODO');
  const completedTasks = tasks.filter(t => t.status === 'COMPLETED');

  return (
    <div className={styles.boardContainer}>
      <CreateTaskForm onTaskCreated={refetch} />

      <div className={styles.columnsWrapper}>
        <div className={styles.column}>
          <h3>Todo ({todoTasks.length})</h3>
          <div className={styles.taskList}>
            {todoTasks.map(task => (
              <TaskItem key={task.id} task={task} onRefresh={refetch} />
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <h3>Completed ({completedTasks.length})</h3>
          <div className={styles.taskList}>
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} onRefresh={refetch} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};