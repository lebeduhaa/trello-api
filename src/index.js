const express = require('express');
const loader = require('./loaders');
const config = require('./config');

const startServer = () => {
    const app = express();

    loader.appInit(app);

    app.listen(config.port, (err) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        } else {
            // eslint-disable-next-line no-console
            console.log(`Server run on the port ${config.port}!`);
        }
    });
};

process.on('uncaughtException', (exception) => {

    // eslint-disable-next-line no-console
    console.log('Something happened!', exception);
});

process.on('unhandledRejection', (exception) => {
    // eslint-disable-next-line no-console
    console.log('Something happened!', exception);
});

startServer();
