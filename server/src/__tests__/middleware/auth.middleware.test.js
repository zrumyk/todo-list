const jwt = require('jsonwebtoken');
const authMiddleware = require('../../middleware/auth.middleware');

jest.mock('jsonwebtoken');

describe('auth validation', () => {
  let req,
    res = null,
    next;

  beforeEach(() => {
    next = jest.fn();
  });

  test('should return error: no authorization header :(', () => {
    req = {
      user: {},
      headers: {},
    };

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(2);
    expect(next).toHaveBeenNthCalledWith(
      1,
      Error('no authorization header :(')
    );
    expect(next).toHaveBeenNthCalledWith(2, Error('validation failed :('));
  });

  test('should return error: Token is not found :(', () => {
    req = {
      user: {},
      headers: {
        authorization: 'Bearer',
      },
    };

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(2);
    expect(next).toHaveBeenNthCalledWith(1, Error('token is not found :('));
    expect(next).toHaveBeenNthCalledWith(2, Error('validation failed :('));
  });

  test('should generate jwt and pass next()', () => {
    req = {
      user: {},
      headers: {
        authorization: 'Bearer <token>',
      },
    };
    const userData = { id: 1 };

    jwt.verify.mockReturnValue(userData);

    authMiddleware(req, res, next);

    expect(req.user).toHaveProperty('id', 1);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
