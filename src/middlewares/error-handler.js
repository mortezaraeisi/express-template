const Boom = require('@hapi/boom');

module.exports = function (error, req, res, next) {

    try {
        let response = error;

        if (error.isJoi) {
            const joiMessage = error.details.map(({context: {key}, message}) => ({key, message}));
            response = Boom.badData(undefined, joiMessage)

        } else if (!error.isBoom) {

            // An unpredicted error had been occurred
            // Try to log, email, and so on...
            console.error(error);
            response = Boom.badImplementation(undefined, {logId: 1002});
        }

        res.status(response.output.statusCode).json({
            ...response.output.payload,
            data: response.data
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'A Very bad error happened'})
    }
}