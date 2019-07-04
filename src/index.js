const express = require('express');
const loader = require('./loaders');
const config = require('./config');

const startServer = () => {
    const app = express();

    loader.appInit(app);

    app.listen(config.port, err => {
        if (err) {
            console.error(err);

            return;
        } else {
            console.log(`Server run on the port ${config.port}!`);
        }
    });
}

process.on('uncaughtException', exception => {
    console.log('Something happened!', exception);
});

process.on('unhandledRejection', exception => {
    console.log('Something happened!', exception);
});

startServer();


