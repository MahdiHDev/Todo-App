const router = require('express').Router();
const { loginGetController } = require('../controllers/loginGetController');
const { loginPostController } = require('../controllers/loginPostController');
const loginPostValidator = require('../validator/loginPostValidator');

router.get('/', loginGetController);

router.post('/', loginPostValidator, loginPostController);

// export router
module.exports = router;
