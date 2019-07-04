const helpers = require('../helpers');

exports.unauthorized = (request, response, next) => {
    if (!request.user) {
        response
            .status(401)
            .send('You are unauthorized!');
    } else {
        next();
    }
};

exports.adminFeature = (request, response, next) => {
    if (request.user.role !== helpers.constants.roles.admin) {
        response
            .status(403)
            .send('You have no access for this resource');
    } else {
        next();
    }
};
