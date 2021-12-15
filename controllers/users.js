const User = require('../models/user')
const activeUser = false;
const fs = require('fs');

const UsersController = {
  New: function(req, res) {
    res.render('users/new', { title: 'Sign-In', loggedIn: activeUser });
  },
  Create: function(req, res) {
    
    // read default image (paw.png)
      let img = fs.readFileSync(__dirname + '/../public/images/paw.png')
      const encodedimage = img.toString('base64')
      req.body.filename = 'default image'
      req.body.contentType = 'image/jpeg'
      req.body.imageBase64 = encodedimage

    var user = new User(req.body);
    user.save(function(err) {
      if (err) { 
        throw err; }
      res.status(201).redirect('/sessions/new');
    });
  },
}

module.exports = UsersController;
