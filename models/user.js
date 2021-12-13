'use strict';

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const mongoose = require('mongoose');
const { nodeModuleNameResolver } = require('typescript');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },

  filename:{ type:String, required:true },
  contentType:{ type:String, required:true },
  imageBase64:{ type:String, required:true }
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

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;

