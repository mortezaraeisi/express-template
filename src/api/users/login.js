const Joi = require('@hapi/joi');
const UserSchema = require('../../models/users').$schema;

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
        username: Joi.string().required().min(UserSchema.username.min).max(UserSchema.username.max),
        password: Joi.string().required(),
    })
};

function handler({req}) {
    return {
        OK: 'OK',
        body: req.body,
    }
}

module.exports = {
    route: '/login',
    method: 'POST',
    validate,
    handler,
}
