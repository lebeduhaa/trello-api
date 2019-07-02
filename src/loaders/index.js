const expressLoader = require('./express');
const middlewareLoader = require('./middleware');
const routesLeader = require('./routes');

exports.appInit = async expressApp => {
  expressLoader(expressApp);
  middlewareLoader(expressApp);
  routesLeader(expressApp);
}
