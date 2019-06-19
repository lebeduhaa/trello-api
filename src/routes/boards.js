
const fs = require('fs');
const express = require('express');
const Joi = require('@hapi/joi');

const router = express.Router();
const boards = require('../../db/boards.json');
const permissions = require('../middleware/permissions');
const helpers = require('./../helpers');

router
    .use(permissions.unauthorized);

router.get('/boards', (request, response) => {
    response.send(boards);
});

router.get('/boards/:id', (request, response) => {
    const { id } = request.params;
    const board = boards.find(currentBoard => currentBoard.id === Number(id));

    response.send(board);
});

router.delete('/boards/:id', permissions.adminFeature, (request, response, next) => {
    const { id } = request.params;
    const boardIndex = boards.findIndex(board => board.id === Number(id));

    boards.splice(boardIndex, 1);

    fs.writeFile(`${__dirname}/../../db/boards.json`, JSON.stringify(boards), (err) => {
        if (err) {
            next(err);
        }

        response
            .status(204)
            .end();
    });
});

router.post('/boards', permissions.adminFeature, (request, response, next) => {
    const result = Joi.validate(request.body, helpers.schemas.createBoard);

    if (result.error) {
        response
            .status(400)
            .send(result.error.details[0].message);
    } else {
        request.body.id = Number(boards[boards.length - 1].id) + 1
        boards.push(request.body);

        fs.writeFile(`${__dirname}/../../db/boards.json`, JSON.stringify(boards), (err) => {
            if (err) {
                next(err);
            }

            response
                .send(request.body);
        });
    }
});

router.put('/boards/:id', permissions.adminFeature, (request, response, next) => {
    const result = Joi.validate(request.body, helpers.schemas.updateBoard);
    const { id } = request.params;

    if (result.error) {
        response
            .status(400)
            .send(result.error.details[0].message);
    } else {
        const boardIndex = boards.findIndex(board => board.id === Number(id));

        boards.splice(boardIndex, 1, request.body);

        fs.writeFile(`${__dirname}/../../db/boards.json`, JSON.stringify(boards), (err) => {
            if (err) {
                next(err);
            }

            response
                .status(204)
                .end();
        });
    }
});

module.exports = router;
