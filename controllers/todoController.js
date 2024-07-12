const Todo = require('../models/todoModel');
const User = require('../models/userModel');

exports.todoPostController = async (req, res) => {
    console.log(req.body);
    try {
        const { user } = req;
        const { _id } = user;

        const todo = new Todo({
            task: req.body.addTask,
            user: _id,
        });

        await todo.save();
        res.status(200).send({
            message: 'Todo was created Successfully',
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: 'Error Occured!',
        });
    }
};

exports.todoGetController = async (req, res) => {
    try {
        const { user } = req;
        console.log(user);
        if (user) {
            const todos = await Todo.find({ user: user._id }).select({ __v: 0 });
            const userObj = await User.findOne({ _id: user._id }).select({ password: 0, __v: 0 });
            res.render('index', { user: userObj, todos });
        } else {
            res.redirect('/login');
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: 'Error Occured!',
        });
    }
};

exports.todoPutController = async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndUpdate(id, {
            status: req.body.status,
        });
        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: 'Error Occured',
        });
    }
};
exports.todoPutTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndUpdate(id, {
            task: req.body.addTask,
        });
        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: 'Error Occured',
        });
    }
};

exports.todoDeleteController = async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: 'Error Occured',
        });
    }
};
