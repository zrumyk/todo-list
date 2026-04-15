const validate = require('../../middleware/validate.middleware');
const { usersSchema } = require('../../schemas');

describe('validate middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReq = { body: {} };
    mockRes = {};
    mockNext = jest.fn();
  });

  test('should call next() without error', () => {
    mockReq.body = {
      username: 'ivan',
      email: 'ivan@test.com',
      password: 'strongPassword123',
    };
    const middleware = validate(usersSchema.create);

    middleware(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith();
  });

  test('should call next(error)', () => {
    mockReq.body = {
      username: 'i',
      email: 'not-an-email',
    };
    const middleware = validate(usersSchema.create);

    middleware(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
  });
});
