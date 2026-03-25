const Joi = require('joi');

const update = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
}).max(1);

module.exports = { update };
