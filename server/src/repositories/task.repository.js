class TaskRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(userId, taskData) {
    return this.prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        userId,
      },
    });
  }

  async update(id, data) {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    await this.prisma.task.delete({
      where: { id },
    });
  }

  async findUserTasks(userId) {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  async findById(id) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }
}

module.exports = TaskRepository;
