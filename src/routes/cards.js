const express = require('express');

const router = express.Router();
const permissions = require('../middleware/permissions');
const Card = require('../models/Card');
const helpers = require('./../helpers');
const validator = require('../middleware/validators');

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

router.post('/cards', validator(helpers.schemas.createCard), async (request, response) => {
    const result = await Card.create(request.body);

    response.send(result);
});

router.put('/cards/:id', validator(helpers.schemas.updateCard), async (request, response) => {
    const { id } = request.params;

    await Card.update(request.body, id);
    response
        .status(204)
        .end();
});

module.exports = router;
