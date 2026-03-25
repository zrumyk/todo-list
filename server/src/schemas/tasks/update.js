const Joi = require('joi');
const { Status } = require('@prisma/client');

const update = Joi.object({
    title: Joi.string().min(1).max(31),
    description: Joi.string().max(255),
    status: Joi.string().valid(...Object.values(Status)),
}).min(1);

module.exports = { update };
