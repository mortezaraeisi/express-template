module.exports = handler => (req, res, next) => {
    try {
        // Invoke
        const data = handler({req, res});

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

    function sendResponse(result) {
        if (result.data) {
            return res
                .status(200)
                .json(result);
        }
        return res
            .status(200)
            .json({
                data: result,
            })
    }
}
