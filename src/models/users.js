const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const $schema = {
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
}

const UserSchema = new mongoose.Schema($schema);

UserSchema.pre('save', function (next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const password = this.password;
    return new Promise(function (resolve, reject) {
        bcrypt.compare(candidatePassword, password, function (err, isMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(isMatch);
            }
        });
    })
};

module.exports = mongoose.model('Users', UserSchema);
module.exports.$schema = $schema;