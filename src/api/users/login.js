const Joi = require('joi');

const validate = {
    body: Joi.object({
        username: Joi.string().required().min(3).max(32),
        password: Joi.string().required().min(3).max(32),
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
