import { useState, useEffect } from 'react';
import posthog from 'posthog-js';
import { useTasks } from '../hooks/useTasks';
import { CreateTaskForm } from './CreateTasForm';
import { deleteTask, updateTask } from '../api/tasks.api';
import styles from './Tasks.module.css';

const TaskItem = ({ task, onRefresh }) => {
  const handleStatus = async () => {
    const newStatus = task.status === 'TODO' ? 'COMPLETED' : 'TODO';
    await updateTask(task.id, newStatus);

    if (newStatus === 'COMPLETED') {
      posthog.capture('task_completed', {
        time_to_complete_seconds: Math.floor((new Date() - new Date(task.createdAt)) / 1000)
      });
    }

    onRefresh();
  };

  const handleDelete = async () => {
    await deleteTask(task.id);

    posthog.capture('task_deleted', { status_before_delete: task.status });

    onRefresh();
  };

  return (
    <div className={`${styles.taskCard} ${task.status === 'COMPLETED' ? styles.completed : ''}`}>
      <div className={styles.taskInfo}>
        <h4>{task.title}</h4>
        {task.description && <p>{task.description}</p>}
      </div>
      <div className={styles.taskActions}>
        <button onClick={handleStatus} className={styles.statusBtn} title="Change status">
          {task.status === 'TODO' ? '✔' : '↩️'}
        </button>
        <button onClick={handleDelete} className={styles.deleteBtn} title="Delete">
          ❌
        </button>
      </div>
    </div>
  );
};

const TaskColumn = ({ title, tasks, onRefresh }) => (
  <div className={styles.column}>
    <h3>{title} ({tasks.length})</h3>
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onRefresh={onRefresh} />
      ))}
      {tasks.length === 0 && <p className={styles.emptyMsg}>Empty</p>}
    </div>
  </div>
);

export const TaskBoard = () => {
  const { tasks, isLoading, error, refetch } = useTasks();
  
  const [isUrgentFeatureActive, setIsUrgentFeatureActive] = useState(false);
  const [filterUrgent, setFilterUrgent] = useState(false);

  useEffect(() => {
    posthog.onFeatureFlags(() => {
      if (posthog.isFeatureEnabled('show-urgent-filter')) {
        setIsUrgentFeatureActive(true);
      }
    });
  }, []);

  if (isLoading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const filteredTasks = filterUrgent 
    ? tasks.filter(t => 
        t.title.includes('!') || 
        t.description?.toLowerCase().includes('urgent') || 
        t.description?.toLowerCase().includes('asap')
      )
    : tasks;

  const todoTasks = filteredTasks.filter((t) => t.status === 'TODO');
  const completedTasks = filteredTasks.filter((t) => t.status === 'COMPLETED');

  return (
    <div className={styles.boardContainer}>
      <CreateTaskForm onTaskCreated={refetch} />

      {isUrgentFeatureActive && (
        <div className={styles.filterWrapper}>
          <button 
            className={`${styles.urgentBtn} ${filterUrgent ? styles.active : ''}`}
            onClick={() => setFilterUrgent(!filterUrgent)}
          >
            {filterUrgent ? 'show all' : 'only urgent'}
          </button>
        </div>
      )}

      <div className={styles.columnsWrapper}>
        <TaskColumn 
          title="Todo" 
          tasks={todoTasks} 
          onRefresh={refetch} 
        />
        <TaskColumn 
          title="Completed" 
          tasks={completedTasks} 
          onRefresh={refetch} 
        />
      </div>
    </div>
  );
};