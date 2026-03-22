class TaskRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createTask(userId, taskData) {
    return await this.prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        userId,
      },
    });
  }
}

module.exports = TaskRepository;
