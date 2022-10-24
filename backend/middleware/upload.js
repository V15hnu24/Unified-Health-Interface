const path = require('path');
const multer = require('multer');

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/patient_register/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now()+file.originalname);
    }
});

const upload = multer({ storage: Storage });

module.exports = upload;