module.exports = (err, request, response, next) => {
    response
        .status(err.status ? err.status : 500)
        .end(err.text ? err.text : err);
};
