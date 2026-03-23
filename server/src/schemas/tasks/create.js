const Joi = require('joi')

const create = Joi.object({
    title: Joi.string().min(1).max(31).required(),
    description: Joi.string().max(255),
})

module.exports = { create }
