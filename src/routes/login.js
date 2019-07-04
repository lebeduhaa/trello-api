const express = require('express');

const router = express.Router();
const validator = require('../middleware/validators');
const UserService = require('../services/User');
const helpers = require('../helpers');

router.post('/login', validator(helpers.schemas.signIn), async (request, response) => {
    const user = request.body;
    const token = await UserService.signIn(user);

    if (token) {
        response.setHeader('auth-token', token);
        response.send(user);
    } else {
        response
            .status(500)
            .send('Incorrect credentials!');
    }
});

module.exports = router;
