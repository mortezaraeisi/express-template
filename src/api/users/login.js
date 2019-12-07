const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const User = require('../../models/users');

/**
 * @apiDefine NotFoundUser
 * @apiName Login
 * @apiGroup Users
 * @apiError User not found with specified data
 */

/**
 * @api {post} /users/login Login and get token
 * @apiUse NotFoundUser
 * @apiDescription Verifies user data and generates appropriate token or throws an error
 * @type {{body: *}}
 */

const validate = {
    body: Joi.object({
        username: Joi.string().required()
            .min(User.schema.path('username').options.min)
            .max(User.schema.path('username').options.max),
        password: Joi.string().required(),
    }),
    outlet: Joi.object({})
};

async function handler({req}) {

    const {username, password, populate} = req.body;
    console.log('populate: %s', populate)
    const userDoc = await User
        .findOne({username}, 'username password firstName lastName email')
        .exec();

    if (!userDoc) {
        throw Boom.forbidden();
    }

    return userDoc
        .comparePassword(password)
        .then(() => {
            return {
                username,
                token: 'Your token will replace here'
            }
        })
        .catch(() => {
            throw Boom.forbidden()
        })
}

module.exports = {
    route: '/login',
    method: 'POST',
    validate,
    handler,
}
