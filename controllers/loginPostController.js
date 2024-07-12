const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const formatter = require('../utilities/errorFormatter');
const User = require('../models/userModel');

exports.loginPostController = async (req, res) => {
    const errors = validationResult(req).formatWith(formatter).mapped();
    const keys = Object.keys(errors);
    const { body } = req;
    if (keys.length > 0) {
        res.render('login', { errors, body });
    } else {
        const user = await User.findOne({ email: body.email });
        const userObj = {
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
        };
        const token = jwt.sign(userObj, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXP_TIME,
        });
        res.cookie('uid', token, {
            maxAge: process.env.COOKIE_EXP_TIME,
            httpOnly: true,
            signed: true,
        });
        res.redirect('/');
    }
};
