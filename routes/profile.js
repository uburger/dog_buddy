var express = require('express');
var router = express.Router();
var ProfileController = require('../controllers/profile');

router.get('/', function(req, res, next) {
    res.render('./profile/index', { title: 'Express' });
  });

router.get('/profile', ProfileController.Index);
// router.post('/profile', ProfileController.Create); 

module.exports = router;
