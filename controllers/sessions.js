const User = require('../models/user');
const bcrypt = require('bcrypt'); 

var SessionsController = {
  New: function(req, res) {
    res.render('sessions/new', { title: 'Sign-in', loggedIn: false });
  },

  Create: function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email}).then(user => {
       
        if (!user) return res.redirect('/sessions/new');
   
        bcrypt.compare(password, user.password, (err, data) => {
            if (err) throw err
          
            if (data) {
              req.session.user = user;
              res.redirect('/map');

            } else {
              res.redirect('/sessions/new?error=' + encodeURIComponent('Password_Username_Incorrect'));
            }

        })

    })
  },

  Destroy: function(req, res) {
    console.log('logging out')
    if (req.session.user && req.cookies.user_sid) { 
      res.clearCookie('user_sid');
    }
    res.redirect('/sessions/new');
  }
};

module.exports = SessionsController;

