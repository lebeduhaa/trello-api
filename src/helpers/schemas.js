const Joi = require('@hapi/joi');

exports.createBoard = Joi
    .object()
    .keys({
        name: Joi
            .string()
            .max(50)
            .required(),
        color: Joi
            .string()
            .length(7)
            .required(),
        description: Joi
            .string()
            .max(256)
            .required(),
        created_at: Joi
            .string()
            .isoDate()
            .required()
    });

exports.updateBoard = Joi
    .object()
    .keys({
        id: Joi
            .number()
            .integer()
            .required(),
        name: Joi
            .string()
            .max(50)
            .required(),
        color: Joi
            .string()
            .length(7)
            .required(),
        description: Joi
            .string()
            .max(256)
            .required(),
        created_at: Joi
            .string()
            .isoDate()
            .required()
    });

exports.createCard = Joi
    .object()
    .keys({
        name: Joi
            .string()
            .max(50)
            .required(),
        description: Joi
            .string()
            .max(256)
            .required(),
        created_at: Joi
            .string()
            .isoDate()
            .required(),
        estimate: Joi
            .string()
            .required(),
        status: Joi
            .string()
            .valid('to do', 'in progress', 'done')
            .required(),
        due_date: Joi
            .string()
            .isoDate()
            .required(),
        labels: Joi
            .array()
            .items(Joi.string())
            .required()
    });

exports.updateCard = Joi
    .object()
    .keys({
        id: Joi
            .number()
            .integer()
            .required(),
        name: Joi
            .string()
            .max(50)
            .required(),
        description: Joi
            .string()
            .max(256)
            .required(),
        created_at: Joi
            .string()
            .isoDate()
            .required(),
        estimate: Joi
            .string()
            .required(),
        status: Joi
            .string()
            .valid('to do', 'in progress', 'done')
            .required(),
        due_date: Joi
            .string()
            .isoDate()
            .required(),
        labels: Joi
            .array()
            .items(Joi.string())
            .required()
    });
