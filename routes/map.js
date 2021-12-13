const express = require('express');
const router = express.Router();
const MapController = require('../controllers/map');

/* GET home page. */
router.get('/', MapController.Map);

module.exports = router;
