const userData = require('../middleware/user-data');
const logger = require('../middleware/user-data');
const helmet = require('helmet');

module.exports = expressApp => {
  expressApp
    .use(helmet())
    .use(userData)
    .use(logger);
}
