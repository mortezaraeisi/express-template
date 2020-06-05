module.exports = function registerPingAPI () {
  return {
    method: ['POST', 'GET', 'PUT', 'DELETE'],
    route: '/ping',
    validate,
    postValidate,
    handler
  }
}

const validate = {}
const postValidate = {}

async function handler () {
  return Promise.resolve({
    pong: 'I am OK'
  })
}
