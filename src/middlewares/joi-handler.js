const Joi = require('joi');
const Boom = require('boom');

const emptyObject = Joi.object({});

module.exports = validate => (req, res, next) => {

    return Promise
        .all(
            ['params', 'query', 'body']
                .map(target =>
                    Joi.validate(req[target], validate[target] || emptyObject))
        )
        .then(() => next())
        .catch(error => {
            next(error);
        });
}