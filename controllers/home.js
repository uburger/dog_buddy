var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Paw Pals' });
  }
};

module.exports = HomeController;
