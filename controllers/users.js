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

    req.body.name = "null"
    req.body.breed = "null"
    req.body.age = 0000
    req.body.bio = "null"
    

    var email = req.body.email;

    User.findOne({email: email}).then(user => { 
      if (email !== null && email !== '') {  
        if (!user){
          var newUser = new User(req.body);
          newUser.save(function(err) {
            if (err) { 
              throw err; 
            }
            res.status(201).redirect('/sessions/new');
          });
        } else {
          res.redirect('/users/new?error=' + encodeURIComponent('Already_Exists'));
        }
      } else {
        res.redirect('/users/new?error=' + encodeURIComponent('Enter_Email'));
      }
    })
  },
}

module.exports = UsersController;
