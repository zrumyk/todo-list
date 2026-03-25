class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }

    create = async (req, res, next) => {
        try {
            const data = await this.taskService.create(req.user.id, req.body);
            res.status(201).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const data = await this.taskService.update(req.params.id, req.body);
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
            await this.taskService.delete(req.params.id);
            res.status(204).json();
        } catch (error) {
            next(error);
        }
    };

    find = async (req, res, next) => {
        try {
            const data = await this.taskService.find(req.params.id);
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

    findUserTasks = async (req, res, next) => {
        try {
            const data = await this.taskService.findUserTasks(req.user.id);
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = TaskController;
