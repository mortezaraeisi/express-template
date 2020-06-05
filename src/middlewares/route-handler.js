module.exports = handler => (req, res, next) => {
  try {
    // Invoke
    const data = handler({ req, res, next })

    // Returned a promise
    if (typeof data.then === 'function') {
      data
        .then(sendResponse)
        .catch(next)
    } else {
      sendResponse(data)
    }

  } catch (e) {
    return next(e)
  }

  function sendResponse (result) {
    return res
      .status(200)
      .json({
        success: true,
        data: result
      })
  }
}
