var IndexController = {
    Index: function(req, res) {
      res.render('index', { title: 'Express' });
    }
  };
  
  module.exports = IndexController;