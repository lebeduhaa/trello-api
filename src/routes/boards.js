const express = require('express');
const Joi = require('@hapi/joi');

const router = express.Router();
const permissions = require('../middleware/permissions');
const helpers = require('./../helpers');
const Board = require('../models/Board');

router
    .use(permissions.unauthorized);

router.get('/boards', async (request, response) => {
    const boards = await Board.getAll();

    response.send(boards);
});

router.get('/boards/:id', async (request, response) => {
    const { id } = request.params;
    const board = await Board.getById(id);

    response.send(board);
});

router.delete('/boards/:id', permissions.adminFeature, async (request, response) => {
    const { id } = request.params;

    await Board.delete(id);
    response
        .status(204)
        .end();
});

router.post('/boards', permissions.adminFeature, async (request, response) => {
    const validationResult = Joi.validate(request.body, helpers.schemas.createBoard);

    if (validationResult.error) {
        response
            .status(400)
            .send(validationResult.error.details[0].message);
    } else {
        const result = await Board.create(request.body);

        response.send(result);
    }
});

router.put('/boards/:id', permissions.adminFeature, async (request, response) => {
    const validationResult = Joi.validate(request.body, helpers.schemas.updateBoard);
    const { id } = request.params;

    if (validationResult.error) {
        response
            .status(400)
            .send(validationResult.error.details[0].message);
    } else {
        await Board.update(request.body, id);
        response
            .status(204)
            .end();
    }
});

module.exports = router;
