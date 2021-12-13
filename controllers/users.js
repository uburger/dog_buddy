const User = require('../models/user')
const fs = require('fs');

const UsersController = {
  New: function(req, res) {
    res.render('users/new');
  },
  Create: function(req, res) {
    
    // read default image (paw.png)
      let img = fs.readFileSync(__dirname + '/../public/images/paw.png')
      const encodedimage = img.toString('base64')
      req.body.filename = 'default image'
      console.log(img)
      req.body.contentType = 'image/jpeg'
      req.body.imageBase64 = encodedimage

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
