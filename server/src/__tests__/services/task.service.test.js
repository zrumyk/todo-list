const ApiError = require('../../exceptions/api.error');
const TaskService = require('../../services/task.service');

describe('create task', () => {
  let taskService;
  let mockTaskRepository;

  beforeEach(() => {
    mockTaskRepository = {
      create: jest.fn(),
    };
    taskService = new TaskService(mockTaskRepository);
  });

  test('should create task and return it', async () => {
    const userId = 1;
    const data = {
      title: 'test',
      description: 'testDescription',
    };
    const task = {
      id: 1,
      title: 'test',
      description: 'testDescription',
      status: 'TODO',
    };

    mockTaskRepository.create.mockResolvedValue(task);

    const result = await taskService.create(userId, data);

    expect(result).resolves;
    expect(result).toBeDefined();
    expect(mockTaskRepository.create).toHaveBeenCalledWith(userId, data);
  });
});

describe('update task data', () => {
  let taskService;
  let mockTaskRepository;

  beforeEach(() => {
    mockTaskRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    };
    taskService = new TaskService(mockTaskRepository);
  });

  test('should return an error: Task is not exist :(', async () => {
    const taskId = 1;
    const data = {
      title: 'newTest',
      description: 'newTestDescription',
      status: 'TODO',
    };

    mockTaskRepository.findById.mockResolvedValue(null);

    const result = taskService.update(taskId, data);

    await expect(result).rejects.toThrow(ApiError);
    expect(mockTaskRepository.findById).toHaveBeenCalledWith(taskId);
  });

  test('should update task data and return it', async () => {
    const taskId = 1;
    const data = {
      title: 'newTest',
      description: 'newTestDescription',
      status: 'TODO',
    };
    const task = {
      id: 1,
      title: 'test',
      description: 'testDescription',
      status: 'COMPLETED',
    };

    mockTaskRepository.findById.mockResolvedValue(task);
    mockTaskRepository.update.mockResolvedValue(task);

    const result = await taskService.update(taskId, data);

    expect(result).toBeDefined();
    expect(mockTaskRepository.update).toHaveBeenCalledWith(taskId, data);
  });
});

describe('delete task', () => {
  let taskService;
  let mockTaskRepository;

  beforeEach(() => {
    mockTaskRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    };
    taskService = new TaskService(mockTaskRepository);
  });

  test('should return an error: Task is already deleted :(', async () => {
    const taskId = 1;

    mockTaskRepository.findById.mockResolvedValue(null);

    const result = taskService.delete(taskId);

    await expect(result).rejects.toThrow(ApiError);
    expect(mockTaskRepository.findById).toHaveBeenCalledWith(taskId);
  });

  test('should delete task', async () => {
    const taskId = 1;
    const task = {
      id: 1,
      title: 'test',
      description: 'testDescription',
      status: 'COMPLETED',
    };

    mockTaskRepository.findById.mockResolvedValue(task);
    mockTaskRepository.delete.mockResolvedValue({});

    const result = await taskService.delete(taskId);

    expect(mockTaskRepository.delete).toHaveBeenCalledWith(taskId);
    expect(result).toBeUndefined();
  });
});

describe('get task by id', () => {
  let taskService;
  let mockTaskRepository;

  beforeEach(() => {
    mockTaskRepository = {
      findById: jest.fn(),
    };
    taskService = new TaskService(mockTaskRepository);
  });

  test('should return an error: Task is not exist :(', async () => {
    const taskId = 1;

    mockTaskRepository.findById.mockResolvedValue(null);

    const result = taskService.find(taskId);

    await expect(result).rejects.toThrow(ApiError);
    expect(mockTaskRepository.findById).toHaveBeenCalledWith(taskId);
  });

  test('should return task data', async () => {
    const taskId = 1;
    const task = {
      id: 1,
      title: 'test',
      description: 'testDescription',
      status: 'COMPLETED',
    };

    mockTaskRepository.findById.mockResolvedValue(task);

    const result = await taskService.find(taskId);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Object);
  });
});

describe('get user tasks', () => {
  let taskService;
  let mockTaskRepository;

  beforeEach(() => {
    mockTaskRepository = {
      findUserTasks: jest.fn(),
    };
    taskService = new TaskService(mockTaskRepository);
  });

  test('return all user task or []', async () => {
    const userId = 1;
    const tasks = [
      {
        id: 1,
        title: 'test',
        description: 'testDescription',
        status: 'TODO',
      },
      {
        id: 2,
        title: 'test2',
        description: 'testDescription2',
        status: 'COMPLETED',
      },
    ];

    mockTaskRepository.findUserTasks.mockResolvedValue(tasks);

    const result = await taskService.findUserTasks(userId);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(mockTaskRepository.findUserTasks).toHaveBeenCalledWith(userId);
  });
});
