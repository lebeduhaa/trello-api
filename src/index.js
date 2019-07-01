const express = require('express');

const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const userData = require('./middleware/user-data');
const logger = require('./middleware/logger');

app
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cookieParser())
    .use(helmet())
    .use(userData)
    .use(logger)
    .use(require('./routes/login'))
    .use(require('./routes/boards'))
    .use(require('./routes/cards'));

app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Application run on the port 3000!');
});
