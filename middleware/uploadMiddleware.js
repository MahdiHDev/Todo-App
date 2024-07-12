const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        const fileName = file.originalname.replace(extname, '').split(' ').join('-');
        cb(null, fileName + Date.now() + extname);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});

module.exports = upload;
