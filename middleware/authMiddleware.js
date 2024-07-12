const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const { uid } = req.signedCookies;
    if (uid) {
        const token = jwt.verify(uid, process.env.JWT_SECRET_KEY);
        req.user = token;
        next();
    } else {
        res.redirect('/login');
    }
};
