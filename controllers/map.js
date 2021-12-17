'use strict'
const DogEvent = require('../models/dogevent');
const User = require('../models/user');
const WEATHER_API_KEY=process.env.WEATHER_API_KEY

const MapController = {
    Map: function(req, res) {
      DogEvent.find().exec(function(err, dogevents) {
        if (err) { throw err; }
        User.find().exec(function(err, allUser){
          if (err) { throw err; }
          res.render('./map/map', {user: req.session.user, 
            dogevents: dogevents, 
            allUser: allUser,
            title: 'Map', 
            loggedIn: true,
            WEATHER_API_KEY: WEATHER_API_KEY
          });
        })
      })
    }  
}
  module.exports = MapController;
