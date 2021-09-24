var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.createUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);
router.get(
  '/verifyToken',
  authController.verifyToken,
  authController.tokenVerified
);

module.exports = router;
