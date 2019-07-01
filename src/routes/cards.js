const express = require('express');
const Joi = require('@hapi/joi');

const router = express.Router();
const permissions = require('../middleware/permissions');
const Card = require('../models/Card');
const helpers = require('./../helpers');

router
    .use(permissions.unauthorized);

router.get('/cards', async (request, response) => {
    const cards = await Card.getAll();

    response.send(cards);
});

router.get('/cards/:id', async (request, response) => {
    const { id } = request.params;
    const card = await Card.getById(id);

    response.send(card);
});

router.delete('/cards/:id', async (request, response) => {
    const { id } = request.params;

    await Card.delete(id);
    response
        .status(204)
        .end();
});

router.post('/cards', async (request, response) => {
    const validationResult = Joi.validate(request.body, helpers.schemas.createCard);

    if (validationResult.error) {
        response
            .status(400)
            .send(validationResult.error.details[0].message);
    } else {
        const result = await Card.create(request.body);

        response.send(result);
    }
});

router.put('/cards/:id', async (request, response) => {
    const validationResult = Joi.validate(request.body, helpers.schemas.updateCard);
    const { id } = request.params;

    if (validationResult.error) {
        response
            .status(400)
            .send(validationResult.error.details[0].message);
    } else {
        await Card.update(request.body, id);
        response
            .status(204)
            .end();
    }
});

module.exports = router;
