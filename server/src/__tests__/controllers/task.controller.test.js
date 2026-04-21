const TaskController = require('../../controllers/task.controller');

describe('task.controller', () => {
  let taskController;
  let mockTaskService;
  let req, res, next;

  beforeEach(() => {
    mockTaskService = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      find: jest.fn(),
      findUserTasks: jest.fn(),
    };
    taskController = new TaskController(mockTaskService);

    req = {
      body: {
        title: 'test',
        description: 'testDescription',
      },
      user: {
        id: 1,
      },
      params: {
        id: 'uuid',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('create', () => {
    test('should return status 201 and data', async () => {
      const data = { id: 1 };
      mockTaskService.create.mockResolvedValue(data);

      await taskController.create(req, res, next);

      expect(mockTaskService.create).toHaveBeenCalledWith(
        req.user.id,
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          id: 1,
        },
        success: true,
      });
      expect(next).not.toHaveBeenCalled();
    });

    test('should catch an error in next()', async () => {
      const fakeError = new Error('Error :(');
      mockTaskService.create.mockRejectedValue(fakeError);

      await taskController.create(req, res, next);

      expect(next).toHaveBeenCalledWith(fakeError);
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    test('should return status 200 and data', async () => {
      const data = { id: 1 };
      mockTaskService.update.mockResolvedValue(data);

      await taskController.update(req, res, next);

      expect(mockTaskService.update).toHaveBeenCalledWith(
        req.params.id,
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          id: 1,
        },
        success: true,
      });
      expect(next).not.toHaveBeenCalled();
    });

    test('should catch an error in next()', async () => {
      const fakeError = new Error('Error :(');
      mockTaskService.update.mockRejectedValue(fakeError);

      await taskController.update(req, res, next);

      expect(next).toHaveBeenCalledWith(fakeError);
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    test('should return status 204', async () => {
      const data = { id: 1 };
      mockTaskService.delete.mockResolvedValue(data);

      await taskController.delete(req, res, next);

      expect(mockTaskService.delete).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });

    test('should catch an error in next()', async () => {
      const fakeError = new Error('Error :(');
      mockTaskService.delete.mockRejectedValue(fakeError);

      await taskController.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(fakeError);
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('find', () => {
    test('should return status 200 and data', async () => {
      const data = { id: 1 };
      mockTaskService.find.mockResolvedValue(data);

      await taskController.find(req, res, next);

      expect(mockTaskService.find).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(data);
      expect(next).not.toHaveBeenCalled();
    });

    test('should catch an error in next()', async () => {
      const fakeError = new Error('Error :(');
      mockTaskService.find.mockRejectedValue(fakeError);

      await taskController.find(req, res, next);

      expect(next).toHaveBeenCalledWith(fakeError);
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('findUserTasks', () => {
    test('should return status 200 and data', async () => {
      const data = { id: 1 };
      mockTaskService.findUserTasks.mockResolvedValue(data);

      await taskController.findUserTasks(req, res, next);

      expect(mockTaskService.findUserTasks).toHaveBeenCalledWith(req.user.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          id: 1,
        },
        success: true,
      });
      expect(next).not.toHaveBeenCalled();
    });

    test('should catch an error in next()', async () => {
      const fakeError = new Error('Error :(');
      mockTaskService.findUserTasks.mockRejectedValue(fakeError);

      await taskController.findUserTasks(req, res, next);

      expect(next).toHaveBeenCalledWith(fakeError);
      expect(res.status).not.toHaveBeenCalled();
    });
  });
});
