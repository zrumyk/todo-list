const AuthController = require('../../controllers/auth.controller');

describe('auth.controller', () => {
  let authController;
  let mockAuthService;
  let req, res, next;

  beforeEach(() => {
    mockAuthService = {
      register: jest.fn(),
      login: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };
    authController = new AuthController(mockAuthService);

    req = {
      body: {
        username: 'test',
        email: 'test@example.com',
      },
      user: {
        id: 1,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('register', () => {
    test('should return status 201 and data', async () => {
      const data = { id: 1 };
      mockAuthService.register.mockResolvedValue(data);

      await authController.register(req, res, next);

      expect(mockAuthService.register).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(data);
      expect(next).not.toHaveBeenCalled();
    });

    test('should catch an error in next()', async () => {
      const fakeError = new Error('Error :(');
      mockAuthService.register.mockRejectedValue(fakeError);

      await authController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(fakeError);
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    test('should return status 200 and data', async () => {
      const data = { id: 1 };
      mockAuthService.login.mockResolvedValue(data);

      await authController.login(req, res, next);

      expect(mockAuthService.login).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(data);
      expect(next).not.toHaveBeenCalled();
    });

    test('should catch an error in next()', async () => {
      const fakeError = new Error('Error :(');
      mockAuthService.login.mockRejectedValue(fakeError);

      await authController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(fakeError);
      expect(res.status).not.toHaveBeenCalled();
    });
  });
});
