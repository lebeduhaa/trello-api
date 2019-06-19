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
        owner_id: Joi
            .number()
            .integer()
            .min(1)
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
        owner_id: Joi
            .number()
            .integer()
            .min(1)
            .required(),
        created_at: Joi
            .string()
            .isoDate()
            .required()
    });
