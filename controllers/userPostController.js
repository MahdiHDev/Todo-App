const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const formatter = require('../utilities/errorFormatter');
const User = require('../models/userModel');

exports.userPostController = async (req, res) => {
    const errors = validationResult(req).formatWith(formatter).mapped();
    const keys = Object.keys(errors);
    const { body } = req;
    if (keys.length > 0) {
        res.render('signup', { errors, body });
    } else {
        try {
            // eslint-disable-next-line object-curly-newline
            const { name, phone, email, password } = body;
            const hashedPassword = await bcrypt.hash(password, 11);
            const user = new User({
                name,
                phone,
                email,
                password: hashedPassword,
            });
            await user.save();
            res.redirect('login');
        } catch (e) {
            console.log(e);
        }
    }
};
