const jwt = require('jsonwebtoken');
const ApiError = require('../exceptions/api.error');
const config = require('../configuration/config');

function authMiddleware(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw next(ApiError.Unauthorized('no authorization header :('));
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw next(ApiError.Unauthorized('token is not found :('));
    }

    const userData = jwt.verify(token, config.jwtSecret);

    req.user = userData;

    next();
  } catch (error) {
    console.log(error);
    return next(ApiError.Unauthorized('validation failed :('));
  }
}

module.exports = authMiddleware;
