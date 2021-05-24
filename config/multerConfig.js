const multer = require('multer');

const upload = multer({
    dest: './temp/images/',
    limits: {
        fileSize: 1000000,
    },

    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(false)
        }
        cb(undefined, true)
    }
});


module.exports = upload;