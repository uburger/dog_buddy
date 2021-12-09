var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/index');

/* GET home page. */
// eslint-disable-next-line no-unused-vars
// router.get('/', function(req, res, _next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', IndexController.Index);

module.exports = router;
