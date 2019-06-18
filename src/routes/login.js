const express = require('express');

const router = express.Router();
const helpers = require('../helpers');

router.post('/login', async (request, response) => {
    const { login, password } = request.body;
    const user = await helpers.Auth.getUser(login, password);

    if (user) {
        const token = helpers.Auth.getToken(user, helpers.constants.secret);

        response.cookie('auth-token', token);
        response.send(user);
    } else {
        response
            .status(500)
            .send('Incorrect credentials!');
    }
});

module.exports = router;
