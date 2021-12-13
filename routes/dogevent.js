'use strict'

const express = require('express');
const router = express.Router();

const DogEventController = require('../controllers/dogevents')

router.post('/', DogEventController.Create);

module.exports = router;


