const express = require('../../node_modules/express');

module.exports = (expressApp) => {
    expressApp
        .use(express.urlencoded({ extended: true }))
        .use(express.json());
};
