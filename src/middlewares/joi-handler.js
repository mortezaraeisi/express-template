const Joi = require('@hapi/joi');

/*
 * The default rule! If you don't specify any Joi definition,
 *  the object must be empty
 *
*/

const emptyRule = Joi.object({});

/**
 * Assert and attempt received data against Joi definition
 *
 * @param {Object} validate - A Joi object
 * @returns {undefined} It will call next middleware properly
 */
module.exports = validate => (req, res, next) => {

    for (const field of ['params', 'query', 'body']) {

        const target = req[field];
        const joiObject = validate[field] || emptyRule; // Should define every aspects

        try {
            Joi.assert(target, joiObject);

            const attempt = Joi.attempt(target, joiObject);
            req[field] = attempt;

        } catch (e) {
            return next(e);
        }
    }

    next();
}