const express = require('express');
const router = express.Router();
const MapController = require('../controllers/map');

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', function(req, res, next) {
  res.render('./map/map', { title: 'Express' });
});

router.get('/', MapController.Map);

module.exports = router;
