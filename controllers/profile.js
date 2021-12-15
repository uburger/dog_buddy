const User = require("../models/user");
const fs = require("fs")

// var Profile = require('../models/user'); 
var ProfileController = {
  Index: function(req, res) {
      res.render('./profile/index'); 
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
  User.findOneAndUpdate(filter, update, { new: true }, (err, updatedUser)=>{
    if(err) { throw err }
    req.session.user = updatedUser
    res.status(201).redirect('/map');
  })
  }
};

module.exports = ProfileController; 