'use strict'

const DogEvent = require('../models/dogevent');

const DogEventsController = {
  Create: function(req, res) {
    console.log(req.body);
    const dogevent = new DogEvent({
      eventLat: req.body.markerLat,
      eventLon: req.body.markerLon, 
      eventHeadline: req.body.headline,
      eventDescript: req.body.descript,
      eventDate: req.body.date,
      eventTime: req.body.time,
      eventOrganizer: req.session.user.email
      });
    dogevent.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/map');
    });
  },

  
};

module.exports = DogEventsController;

