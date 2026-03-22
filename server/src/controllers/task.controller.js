class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }

    createTask = async (req, res, next) => {
        try {
            const task = await this.taskService.createTask(req.user.id, req.body);
            res.status(201).json(task);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = TaskController;