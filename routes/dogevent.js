'use strict'

const express = require('express');
const router = express.Router();

const DogEventController = require('../controllers/dogevents')

router.post('/dogevent', DogEventController.Create);

module.exports = router;


