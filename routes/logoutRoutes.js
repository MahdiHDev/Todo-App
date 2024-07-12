const router = require('express').Router();

router.get('/', (req, res) => {
    res.clearCookie('uid');
    res.redirect('/');
});

// export router
module.exports = router;
