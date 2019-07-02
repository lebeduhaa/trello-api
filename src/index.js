const express = require('express');
const loader = require('./loaders');

const startServer = () => {
    const app = express();

    loader.appInit(app);

    app.listen(3000, err => {
        if (err) {
            console.error(err);

            return;
        } else {
            console.log('Server run on the port 3000!');
        }
    });
}

startServer();
