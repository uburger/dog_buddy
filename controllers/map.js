'use strict'
const DogEvent = require('../models/dogevent');

const MapController = {
    Map: function(req, res) {
      DogEvent.find().exec(function(err, dogevents) {
        if (err) { throw err; }
      res.render('./map/map', {user: req.session.user, dogevents: dogevents});
      })
    }  
}
  module.exports = MapController;
