var express = require('express');
var router = express.Router();
const { verifyToken } = require('../controllers/authController');
const gamesController = require('../controllers/gamesController');

router.get('/', verifyToken, gamesController.getGames);

module.exports = router;
