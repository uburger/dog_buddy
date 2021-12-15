const activeUser = true;

const MapController = {
  Map: function(req, res) {
    res.render('./map/map', {user: req.session.user, title: 'Map', loggedIn: activeUser });
  }
};
  
  module.exports = MapController;