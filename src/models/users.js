const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        id: true,
        primaryKey: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 32
    },
    password: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 32,
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 32,
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 32,
    },
});

UserSchema.pre('save', function (next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    return bcryptjs
        .genSalt(SALT_WORK_FACTOR)

        .then(salt => bcryptjs.hash(user.password, salt))

        .then(hashed => {
            user.password = hashed;
            next();
        })
        .catch(next)
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const password = this.password;
    return new Promise(function (resolve, reject) {
        bcryptjs.compare(candidatePassword, password, function (err, isMatch) {

            if (err) {
                return reject(err);
            }

            if (!isMatch) {
                return reject('Not Matched');
            }

            resolve(isMatch);
        });
    })
};

module.exports = mongoose.model('Users', UserSchema);