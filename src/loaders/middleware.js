const helmet = require('helmet');

const userData = require('../middleware/get-user-data');
const logger = require('../middleware/logger');

module.exports = (expressApp) => {
    expressApp
        .use(helmet())
        .use(userData)
        .use(logger);
};
