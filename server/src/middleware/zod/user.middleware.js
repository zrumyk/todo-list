const { z } = require("zod");

const userSchema = z.object({
    username: z.string().min(2, "name must be min 2 letters :("),
    email: z.string().email("incorrect email :("),
    password: z.string().min(6, "password must be min 6 letters :(")
})

module.exports = function(req, res, next) {
    try {
        userSchema.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
}
