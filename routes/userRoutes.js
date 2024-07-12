const router = require('express').Router();
const { userGetController } = require('../controllers/userGetController');
const { userPostController } = require('../controllers/userPostController');
const userPostValidator = require('../validator/userPostValidator');

router.get('/', userGetController);

router.post('/', userPostValidator, userPostController);

// export router
module.exports = router;
