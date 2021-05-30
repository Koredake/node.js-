var express = require('express');
var router = express.Router();

router.get('/score', function(req, res, next) {
  res.render('score');
});

module.exports = router;
