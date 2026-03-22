const { z } = require("zod");

const taskSchema = z.object({
    title: z.string().min(1, "name must be min 1 letter :("),
    description: z.string().max(256, "description must be max 256 letters :("),
})

module.exports = function(req, res, next) {
    try {
        taskSchema.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
}