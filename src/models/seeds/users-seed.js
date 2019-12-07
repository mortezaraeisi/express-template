const User = require('../users');

module.exports = async function userSeedRunner(mongoose) {

    try {
        // Sometime, if you connect to Mongo rapidly it will throw an error
        // In this situation just ignore and do not touch the collection
        // For testing purpose be careful and use the in memory version of Mongo

        await mongoose.connection.db.dropCollection('users');
        await User.insertMany([
            {
                _id: '5cf80118b2b7b13c6dfe9f00',
                username: 'admin',
                password: 'pass1',
                firstName: 'FAdmin',
                lastName: 'LAdmin',
                email: 'admin@gmail.com'
            },
        ]);

    } catch (e) {
        // Go ahead
    }
}