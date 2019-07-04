const helpers = require('../helpers');

module.exports = {
  secret: 'my secret',
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || helpers.constants.environments.develop
}
