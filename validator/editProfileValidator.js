const { body } = require('express-validator');

const validator = [
    body('name')
        .not()
        .isEmpty()
        .withMessage("Name can't be  empty")
        .isLength({ min: 3, max: 15 })
        .withMessage('Name should be under minimum 3 and maximum 15 characters')
        .trim(),
];

// export
module.exports = validator;
