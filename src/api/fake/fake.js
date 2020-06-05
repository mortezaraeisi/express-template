module.exports = function registerFakeAPI () {
  return {
    method: 'POST',
    route: '/fake',
    validate,
    postValidate,
    handler
  }
}

const validate = {}
const postValidate = {}

async function handler () {
  return Promise.resolve({
    fake: 'data'
  })
}
