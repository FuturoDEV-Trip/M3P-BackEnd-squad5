const multer = require('multer');

module.exports(multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../upload/img')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString + "_" + file.originalname)
        },

    }),
    fileFilter: (req, file, cb) => {
        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find
            (fomatoAceito => fomatoAceito == file.mimetype)
        if (extensaoImg) {
            return cb(null, true)
        }
        return cb(null, false)
    }
}))