class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    update = async (req, res, next) => {
        try {
            const data = await this.userService.update(req.user.id, req.body);
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
            await this.userService.delete(req.user.id);
            res.status(204).json();
        } catch (error) {
            next(error);
        }
    };

    find = async (req, res, next) => {
        try {
            const data = await this.userService.find(req.user.id);
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = UserController;
