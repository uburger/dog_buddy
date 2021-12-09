'use strict'

const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  eventLat: String,
  eventLon: String
});
  
const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
