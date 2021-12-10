'use strict';

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  // added below line to enable image upload
  img:{data:Buffer,contentType: String}
});

UserSchema.pre('save', function(next) {
  const user = this;
  
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

// set storage 
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

  const upload = multer({ storage: storage})

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;