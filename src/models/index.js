const fs = require('fs');
const mongoose = require('mongoose');
const config = require('../config').mongo;

module.exports = async function startMongoDB() {

    console.log('Connecting to Mongo server...');
    await mongoose.connect(config.url, config.options);

    console.log('Running seeds...');

    const seeds = fs
        .readdirSync(__dirname + '/seeds')
        .filter(fileName => /\.js$/.test(fileName));

    for (const fileName of seeds) {
        const seedRunner = require(__dirname + '/seeds/' + fileName);
        await seedRunner(mongoose);
    }
    console.log('Mongo status is OK');
}