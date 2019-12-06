const validate = {};

function handler() {
    return new Promise((resolve, reject) => {
        setTimeout(
            () => resolve({message: 'Your value from Promise after 3sec'})
            , 3000)

    })
}

module.exports = {
    route: '/list',
    method: 'GET',
    validate,
    handler,
}
