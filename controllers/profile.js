
// var Profile = require('../models/user');

const User = require("../models/user");
const fs = require("fs")

var ProfileController = {
  Index: function(req, res) {
      res.render('./profile', { title: "Profile", loggedIn: true }); 
  },

  // new function to update User db with submitted info from profile page form 
  UpdateBio: function(req, res) {
    const name = { name: req.body.name }
    const breed = { breed: req.body.breed }
    const age = { age: req.body.age }
    const bio = { bio: req.body.bio }

    user.save(function(err)) {
      if(err) { throw err }
      res.status(201).redirect('/profile');
    }
  },
  
  Uploads: function(req,res,next) {
    const file = req.file; 
  
    if(!file){
      const error = new Error('Please upload a profile picture');
      error.httpStatusCode = 400;
      return next(error)
    }
  const img = fs.readFileSync(file.path)
  const encodedImage = img.toString('base64')
  const filter = { email: req.session.user.email }
  const update = {  
    filename: file.originalname,
    contentType: file.mimetype,
    imageBase64: encodedImage
  }
  User.findOneAndUpdate(filter, update, { new: true, loggedIn: true }, (err, updatedUser)=>{
    if(err) { throw err }
    req.session.user = updatedUser
    res.status(201).redirect('/map');
  })
  }
};

module.exports = ProfileController; 