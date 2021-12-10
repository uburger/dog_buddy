const User = require('../models/user')

const UsersController = {
  New: function(req, res) {
    res.render('users/new');
  },
  Create: function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
      if (err) { 
        console.log("Database Error");
        throw err; }
      res.status(201).redirect('/map');
    });
  },
}

module.exports = UsersController;
