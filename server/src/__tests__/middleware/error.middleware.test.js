const ApiError = require('../../exceptions/api.error');
const errorMiddleware = require('../../middleware/error.middleware');
const Joi = require('joi');

describe('error handler', () => {
    let err,
        req = null,
        res;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    test('should return ApiError with status 401 and message: ApiError :(', () => {
        err = ApiError.Unauthorized('ApiError :(');

        errorMiddleware(err, req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'ApiError :(',
        });
    });

    test('should return PrismaError with status 400 and message: PrismaError :(', () => {
        err = {
            code: 'P2002',
            message: 'PrismaError :(',
        };

        errorMiddleware(err, req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'PrismaError :(',
        });
    });

    test('should return ValidationError with status 400 and message: Data validation error', () => {
        const schema = Joi.string().min(5);
        const { error: err } = schema.validate('123');

        errorMiddleware(err, req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Data validation error: ' + err.details[0].message,
        });
    });

    test('should return error with status 500 and message: Unpredictable error', () => {
        err = Error('test error');

        errorMiddleware(err, req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Unpredictable error: ' + err.message,
        });
    });
});
