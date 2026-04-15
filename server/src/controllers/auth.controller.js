class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  login = async (req, res, next) => {
    try {
      const data = await this.authService.login(req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const data = await this.authService.register(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  getMe = async (req, res, next) => {
    try {
      const data = await this.authService.getMe(req.user.id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
