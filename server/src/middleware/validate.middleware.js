const validate = (schema) => (req, res, next) => {
    try {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(error);
        }
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = validate;
