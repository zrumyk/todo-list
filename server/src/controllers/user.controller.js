class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  changeName = async (req, res, next) => {
    try {
      const userData = await this.userService.changeName(req.user.id, req.body);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  changePassword = async (req, res, next) => {
    try {
      await this.userService.changePassword(req.user.id, req.body);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  getUser = async (req, res, next) => {
    try {
      const userData = await this.userService.getUser(req.user.id);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  login = async (req, res, next) => {
    try {
      const user = await this.userService.login(req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  register = async (req, res, next) => {
    try {
      const user = await this.userService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
        next(error);
    }
  }
}

module.exports = UserController;
