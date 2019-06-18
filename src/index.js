const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const userData = require('./middleware/user-data');

app
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cookieParser())
    .use(userData)
    .use(require('./routes/login'));

app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Application run on the port 3000!');
});
