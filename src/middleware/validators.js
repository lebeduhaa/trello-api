const Joi = require('@hapi/joi');

module.exports = schema => (request, response, next) => {
    const validationResult = Joi.validate(request.body, schema);

    if (validationResult.error) {
        response
            .status(422)
            .send(validationResult.error.details[0].message);
    } else {
        next();
    }
};
