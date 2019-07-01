const express = require('express');

const router = express.Router();
const helpers = require('../helpers');
const Auth = require('../services/Auth');

router.post('/login', async (request, response) => {
    const { login, password } = request.body;
    const user = await Auth.getUser(login, password);

    if (user) {
        const token = Auth.getToken(user, helpers.constants.secret);

        response.setHeader('auth-token', token);
        response.send(user);
    } else {
        response
            .status(500)
            .send('Incorrect credentials!');
    }
});

module.exports = router;
