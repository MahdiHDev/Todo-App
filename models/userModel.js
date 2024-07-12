const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    profilePic: {
        type: String,
        default: 'default.png',
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = new model('User', userSchema);

// export
module.exports = User;
