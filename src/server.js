const express = require('express')
const api = require('./api');
const cors = require('cors');
const Boom = require('@hapi/boom');
const morgan = require('morgan');
const config = require('./config');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/error-handler');

console.log('Server is starting...');

// Register Middleware
const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());

// Ping Pong
app.get('/ping', function (req, res) {

    const ms = Math.abs(new Date() - app.locals.startedAt);
    let seconds = ms / 1000;
    let hours = Math.floor(seconds / 3600);
    let days = Math.floor(hours / 24);
    hours = Math.floor(hours % 24);

    seconds = seconds % 3600;
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    days = days === 0 ? '' : (days === 1 ? 'A day and ' : days + ' days and ');

    res.json({
        pong: {
            startedAt: app.locals.startedAt,
            itMeans: `${days}${hours}:${minutes}:${seconds}`,
            protocol: req.protocol,
        }
    });
});

// Register routes
api(app);

// Handle 404
app.all('*', function () {
    throw Boom.notFound();
});

// Handle errors
app.use(errorHandler);

// Run the server
app.listen(config.server.port, function () {
    app.locals.startedAt = new Date();
    console.log('Server listening on %i port', config.server.port);
})


