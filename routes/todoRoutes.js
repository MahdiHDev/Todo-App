const router = require('express').Router();
const {
    todoPostController,
    todoGetController,
    todoPutController,
    todoPutTaskController,
    todoDeleteController,
} = require('../controllers/todoController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, todoGetController);
router.post('/', authMiddleware, todoPostController);
router.put('/:id', authMiddleware, todoPutController);
router.put('/task/:id', authMiddleware, todoPutTaskController);
router.delete('/:id', authMiddleware, todoDeleteController);

// export router
module.exports = router;
