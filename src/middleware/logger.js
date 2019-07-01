const express = require('express');

const router = express.Router();
const helpers = require('../helpers');
const Logger = require('../models/Logger');

router.all('*', (request, response, next) => {
    const logObject = {
        content: request.user
            ? `user ${request.user.login} has sent ${request.method} request to the ${request.url}`
            : `unauthorized user try to send ${request.method} request to the ${request.url}`
    };

    if (process.env.NODE_ENV === helpers.constants.environments.production) {
        Logger.create(logObject);
    } else {
        // eslint-disable-next-line no-console
        console.log(logObject.content);
    }

    next();
});

module.exports = router;
