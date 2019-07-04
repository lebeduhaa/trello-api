const express = require('express');

const router = express.Router();
const permissions = require('../middleware/permissions');
const helpers = require('./../helpers');
const validator = require('../middleware/validators');
const CardService = require('../services/Card');

router
    .use(permissions.unauthorized);

router.get('/cards', async (request, response) => {
    const cards = await CardService.getCards();

    response.send(cards);
});

router.get('/cards/:id', async (request, response) => {
    const { id } = request.params;
    const card = await CardService.getCard(id);

    response.send(card);
});

router.delete('/cards/:id', async (request, response) => {
    const { id } = request.params;

    await CardService.deleteCard(id);
    response
        .status(204)
        .end();
});

router.post('/cards', validator(helpers.schemas.createCard), async (request, response) => {
    const result = await CardService.createCard(request.body);

    response.send(result);
});

router.put('/cards/:id', validator(helpers.schemas.updateCard), async (request, response) => {
    const { id } = request.params;

    await CardService.updateCard(request.body, id);
    response
        .status(204)
        .end();
});

module.exports = router;
