const { ValidationError } = require('joi');
const ApiError = require('../exceptions/api.error');

function errorMiddleware(err, req, res, next) {
    console.log(err.name);
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,
        });
    }

    if (err.code == 'P2002') {
        return res.status(400).json({
            message: err.message,
        });
    }

    if (err.isJoi || err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Data validation error: ' + err.details[0].message,
        });
    }

    return res.status(500).json({
        message: 'Unpredictable error: ' + err.message,
    });
}

module.exports = errorMiddleware;
