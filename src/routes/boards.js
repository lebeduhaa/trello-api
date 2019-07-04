const express = require('express');

const router = express.Router();
const permissions = require('../middleware/permissions');
const helpers = require('./../helpers');
const validator = require('../middleware/validators');
const BoardService = require('../services/Board');

router
    .use(permissions.unauthorized);

router.get('/boards', async (request, response) => {
    const boards = await BoardService.getBoards();

    response.send(boards);
});

router.get('/boards/:id', async (request, response) => {
    const { id } = request.params;
    const board = await BoardService.getBoard(id);

    response.send(board);
});

router.delete('/boards/:id', permissions.adminFeature, async (request, response) => {
    const { id } = request.params;

    await BoardService.deleteBoard(id);

    response
        .status(204)
        .end();
});

router.post('/boards', permissions.adminFeature, validator(helpers.schemas.createBoard), async (request, response) => {
    const result = await BoardService.createBoard(request.body);

    response.send(result);
});

router.put('/boards/:id', permissions.adminFeature, validator(helpers.schemas.updateBoard), async (request, response) => {
    const { id } = request.params;

    await BoardService.updateBoard(request.body, id);
    response
        .status(204)
        .end();
});

module.exports = router;
