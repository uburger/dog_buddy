'use strict'

const DogEvent = require('../models/dogevent');

const DogEventsController = {
  Create: function(req, res) {
    const dogevent = new DogEvent({
      eventLat: req.body.markerLat,
      eventLon: req.body.markerLon 
      });
    dogevent.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/map');
    });
  }
};

module.exports = DogEventsController;

