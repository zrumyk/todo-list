class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    login = async (req, res, next) => {
        try {
            const data = await this.authService.login(req.body);
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

    register = async (req, res, next) => {
        try {
            const data = await this.authService.register(req.body);
            res.status(201).json({
                success: true,
                data: data,
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = AuthController;
