const MapController = {
    Map: function(req, res) {
      console.log("We are in the map controller.")
      console.log(req.session.user)
      res.render('./map/map', {user: req.session.user});
    }
  };
  
  module.exports = MapController;