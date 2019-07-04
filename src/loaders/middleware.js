const userData = require('../middleware/get-user-data');
const logger = require('../middleware/logger');
const helmet = require('helmet');

module.exports = expressApp => {
  expressApp
    .use(helmet())
    .use(userData)
    .use(logger);
}
