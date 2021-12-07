var express = require('express');
var router = express.Router();

/* GET users listing. */
// eslint-disable-next-line no-unused-vars
router.get('/', function(_req, res, _next) {
  res.send('respond with a resource');
});

module.exports = router;
