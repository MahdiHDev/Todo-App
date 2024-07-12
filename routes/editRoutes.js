const router = require('express').Router();
const upload = require('../middleware/uploadMiddleware');
const { authMiddleware } = require('../middleware/authMiddleware');
const {
    editProfileGetController,
    editProfilePostController,
    editProfileDeleteController,
} = require('../controllers/editProfileController');
const editProfileValidator = require('../validator/editProfileValidator');

router.get('/', authMiddleware, editProfileGetController);
router.post(
    '/',
    authMiddleware,
    upload.single('profilePic'),
    editProfileValidator,
    editProfilePostController
);
router.delete('/:id', authMiddleware, editProfileDeleteController);

module.exports = router;
