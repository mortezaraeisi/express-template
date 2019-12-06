const fs = require('fs');
const path = require('path');
const express = require('express');
const joiHandler = require('../middlewares/joi-handler');
const routeHandler = require('../middlewares/route-handler');

module.exports = function (app) {
    register(__dirname, app);
};

function register(directory, app) {

    // Probe directories
    fs.readdirSync(directory)
        .filter(file => !/\.js$/.test(file))
        .forEach(createSubApp);

    function createSubApp(dir) {
        const subApp = express();
        app.use('/' + dir, subApp);
        registerRoutes(path.join(directory, dir), subApp);

        // Recursively check children
        register(path.join(directory, dir), subApp);
    }
}

function registerRoutes(directory, app) {

    fs.readdirSync(directory)
        .filter(file => /\.js$/.test(file))
        .filter(x => x !== 'index.js')
        .forEach(bindRoute);

    function bindRoute(file) {

        const {route, method, validate, handler} = require(path.join(directory, file));
        app[method.toLowerCase()](route, [
            joiHandler(validate),
            routeHandler(handler)
        ]);
    }
}