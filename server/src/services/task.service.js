const ApiError = require('../exceptions/api.error');

class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async create(userId, data) {
        return this.taskRepository.create(userId, data);
    }

    async update(id, data) {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw ApiError.BadRequest('Task is not exist :(');
        }

        return this.taskRepository.update(id, data);
    }

    async delete(id) {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw ApiError.BadRequest('Task is already deleted :(');
        }

        await this.taskRepository.delete(id);
    }

    async find(id) {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw ApiError.BadRequest('Task is not exist :(');
        }

        return task;
    }

    async findUserTasks(userId) {
        return this.taskRepository.findUserTasks(userId);
    }
}

module.exports = TaskService;
