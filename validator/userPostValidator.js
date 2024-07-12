const { body } = require('express-validator');
const { Error } = require('mongoose');
const User = require('../models/userModel');

const validator = [
    body('name')
        .not()
        .isEmpty()
        .withMessage("Name can't be  empty")
        .isLength({ min: 3, max: 15 })
        .withMessage('Name should be under minimum 3 and maximum 15 characters')
        .trim(),
    body('phone')
        .not()
        .isEmpty()
        .withMessage("Phone can't be empty")
        .isLength({ max: 11 })
        .withMessage("Number's maximum length 11 characters")
        .trim(),
    body('email')
        .not()
        .isEmpty()
        .withMessage("Email can't be empty!")
        .normalizeEmail()
        .isEmail()
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new Error('A user already exists with this e-mail address');
            }
        }),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password is empty')
        .isLength({ min: 6 })
        .withMessage('Password Must be greater then 6 characters'),
    body('confirmPassword').custom((confirmPassword, { req }) => {
        if (confirmPassword === req.body.password) {
            return true;
        }
        throw new Error("Password Doesn't matched");
    }),
];

// export
module.exports = validator;
