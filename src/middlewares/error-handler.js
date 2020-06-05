const Boom = require('@hapi/boom')

module.exports = function (error, req, res, next) {

  try {
    let response = error

    if (error.isJoi) {
      const joiMessage = error.details.map(({ context: { key }, message }) => ({ key, message }))
      response = Boom.badData(undefined, joiMessage)

    } else if (!error.isBoom) {

      // An unpredicted error had been occurred
      // Try to log, email, and so on...
      $logger.warn(error, error.message)
      response = Boom.badImplementation(error.message)
    }

    res.status(208).json({
      success: false,
      data: {
        error: response.data,
        payload: response.output.payload
      }
    })

  } catch (e) {
    $logger.error(e)
    res.status(209)
      .json({
        success: false,
        data: {
          error: null,
          payload: {
            statusCode: 500,
            error: 'A Very bad error happened',
            message: 'A Very bad error happened'
          }
        }
      })
  }
}
