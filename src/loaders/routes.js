module.exports = expressApp => {
  expressApp
    .use(require('../routes/login'))
    .use(require('../routes/boards'))
    .use(require('../routes/cards'))
    .use(require('../middleware/not-found-handler'));
}
