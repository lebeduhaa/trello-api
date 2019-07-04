const loginRoute = require('../routes/login');
const boardsRoute = require('../routes/boards');
const cardsRoute = require('../routes/cards');
const errorHandler = require('../middleware/error-handler');
const notFoundHandler = require('../middleware/not-found-handler');

module.exports = (expressApp) => {
    expressApp
        .use(loginRoute)
        .use(boardsRoute)
        .use(cardsRoute)
        .use(errorHandler)
        .use(notFoundHandler);
};
