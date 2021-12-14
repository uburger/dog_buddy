const activeUser = true;

const MapController = {
    Map: function(req, res) {
      res.render('index', { title: 'Express', loggedIn: activeUser });
    }
  };
  
  module.exports = MapController;