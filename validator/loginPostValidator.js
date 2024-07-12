const { body } = require('express-validator');
const { Error } = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const validator = [
    body('email')
        .not()
        .isEmpty()
        .withMessage("Email can't be empty!")
        .normalizeEmail()
        .isEmail()
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Invalid credential');
            }
        }),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password is empty')
        .custom(async (value, { req }) => {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const password = await bcrypt.compare(value, user.password);
                if (!password) {
                    throw new Error('Invalid credential');
                }
            } else {
                throw new Error('Invalid credential');
            }
        }),
];

// export
module.exports = validator;
