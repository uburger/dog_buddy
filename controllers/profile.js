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
  
  res.json(file);
  }
};



module.exports = ProfileController; 