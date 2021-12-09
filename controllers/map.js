const MapController = {
    Map: function(req, res) {
      res.render('index', { title: 'Express' });
    }
  };
  
  module.exports = MapController;