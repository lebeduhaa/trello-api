const express = require('express');

const router = express.Router();
const config = require('../config');
const AuthService = require('../services/Auth');

router.all('*', async (request, response, next) => {
    const token = request.headers['auth-token'];

    if (token) {
        const user = AuthService.getUserByToken(token, config.secret);

        request.user = user;
    }

    next();
});

module.exports = router;
