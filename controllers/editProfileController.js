const fs = require('fs');
const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const formatter = require('../utilities/errorFormatter');

exports.editProfileGetController = async (req, res) => {
    const user = await User.findOne({
        _id: req.user._id,
    });
    res.render('edit-profile', {
        user,
        error: {},
        title: 'Edit Profile',
    });
};

exports.editProfilePostController = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.user._id,
        });

        const oldProfilPic = user.profilePic;

        const error = validationResult(req).formatWith(formatter).mapped();
        if (Object.keys(error).length > 0) {
            return res.render('edit-profile', {
                user,
                error,
                title: 'Edit Profile',
            });
        }
        if (req.body.name) {
            await User.findOneAndUpdate(
                {
                    _id: req.user._id,
                },
                {
                    $set: {
                        name: req.body.name,
                    },
                },
            );
        }
        if (req.file) {
            if (oldProfilPic !== 'default.png') {
                fs.unlink(`public/uploads/${oldProfilPic}`, (e) => {
                    if (e) console.log(e);
                });
            }
            const profilePic = req.file.filename;
            if (user) {
                await User.findOneAndUpdate(
                    {
                        _id: req.user._id,
                    },
                    {
                        $set: {
                            profilePic,
                        },
                    }
                );
            }
        }

        res.redirect('/edit');
    } catch (e) {
        console.log(e);
    }
};

exports.editProfileDeleteController = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id });
        const { profilePic } = user;

        if (profilePic !== 'default.png') {
            fs.unlink(`public/uploads/${profilePic}`, (e) => {
                if (e) console.log(e);
            });

            const updated = await User.findOneAndUpdate(
                {
                    _id: id,
                },
                {
                    $set: {
                        profilePic: 'default.png',
                    },
                },
                {
                    new: true,
                }
            );
            if (updated) {
                res.status(200).send({
                    message: 'Profile Remove Successfully!',
                    imgUrl: updated.profilePic,
                });
            }
        } else {
            res.status(200).send({
                message: 'Default Profile Pic Can not be remove',
                imgUrl: profilePic,
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Something was Wrong!',
        });
    }
};
