class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static BadRequest(message) {
        return new ApiError(400, message);
    }

    static Unauthorized(message) {
        return new ApiError(401, message);
    }
}

module.exports = ApiError;
