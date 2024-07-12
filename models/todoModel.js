const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    task: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: String,
        enum: ['complete', 'incomplete'],
        default: 'incomplete',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Todo = new model('Todo', todoSchema);

// export
module.exports = Todo;
