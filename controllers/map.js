const MapController = {
    Map: function(req, res) {
      res.render('./map/map', {user: req.session.user});
    }
  };
  
  module.exports = MapController;