const jwt = require('jsonwebtoken');
const ApiError = require('../exceptions/api.error');
const config = require('../configuration/config');

function authMiddleware(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw next(ApiError.Unauthorized('No authorization header :('));
        }

        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw next(ApiError.Unauthorized('Token is not found :('));
        }

        const userData = jwt.verify(token, config.jwtSecret);

        req.user = userData;

        next();
    } catch (_error) {
        return next(ApiError.Unauthorized('Validation failed :('));
    }
}

module.exports = authMiddleware;
