const { ValidationError } = require('joi');
const ApiError = require('../exceptions/api.error');

function errorMiddleware(err, req, res) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            success: false,
            message: err.message,
        });
    }

    if (err.code == 'P2002') {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    if (err instanceof ValidationError) {
        return res.status(400).json({
            success: false,
            message: 'Data validation error: ' + err.details[0].message,
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Unpredictable error: ' + err.message,
    });
}

module.exports = errorMiddleware;
