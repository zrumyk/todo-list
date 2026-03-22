class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async createTask(userId, data) {
    return this.taskRepository.createTask(userId, data);
  }
}

module.exports = TaskService;
