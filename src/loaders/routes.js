module.exports = expressApp => {
  expressApp
    .use(require('../routes/login'))
    .use(require('../routes/boards'))
    .use(require('../routes/cards'))
    .use(require('../middleware/error-handler'))
    .use(require('../middleware/not-found-handler'));
}
