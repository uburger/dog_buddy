const multer = require('multer');

// set storage
var storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads')
    // We want to store image in the upload folder
  },
  // specifying unique filename for uploaded file
  filename:function(req,file,cb){
    var ext = file.originalname.substring(file.originalname.lastIndexOf('.'));

    cb(null,file.fieldname + '-' + Date.now() + ext)
  } 
})

module.exports = store = multer({ storage: storage })