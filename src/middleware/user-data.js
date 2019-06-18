const express = require('express');

const router = express.Router();
const helpers = require('../helpers');

router.all('*', async (request, response, next) => {
    const token = request.cookies['auth-token'];

    if (token) {
        const user = helpers.Auth.getUserByToken(token, helpers.constants.secret);

        request.user = user;
    }

    next();
});

module.exports = router;
