const router = require('express').Router();
const userController = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, userController.getAllUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
