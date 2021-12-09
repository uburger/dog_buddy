'use strict'

const mongoose = require('mongoose');

const DogEventSchema = new mongoose.Schema({
  eventLat: String,
  eventLon: String
});
  
const DogEvent = mongoose.model('DogEvent', DogEventSchema);

module.exports = DogEvent;
