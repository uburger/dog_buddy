const User = require('../models/user')
const activeUser = false;

const UsersController = {
  New: function(req, res) {
    res.render('users/new', { title: 'Sign-In', loggedIn: activeUser });
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
