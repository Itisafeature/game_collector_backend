var express = require('express');
var router = express.Router();
const { User } = require('../models');

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
