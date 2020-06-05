module.exports = function registerPingSubAPI () {
  return {
    method: ['POST', 'GET', 'PUT', 'DELETE'],
    route: '/subping',
    validate,
    postValidate,
    handler
  }
}

const validate = {}
const postValidate = {}

async function handler () {
  throw new Error('My Error')
}
