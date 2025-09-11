const router = require('express').Router();
const userController = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const appError = require('../utils/appError');
const multer = require("multer");
const {FAIL} = require("../utils/httpStatusText");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}.${file.mimetype.split("/")[1]}`);
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype.split("/")[0] === "image"){
            return cb(null, true);
        } else {
            return cb(appError.create(400, FAIL, "File must be an image"), false);
        }
    }
});

router.get('/', verifyToken, userController.getAllUsers);
router.post('/register', upload.single('image'), userController.register);
router.post('/login', userController.login);

module.exports = router;