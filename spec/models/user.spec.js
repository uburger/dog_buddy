'use strict';

const mongoose = require('mongoose');
const User = require('../../models/user');

require('../mongodb_helper');

describe('User model', function() {
  beforeEach(function(done) {
    mongoose.connection.collections.users.drop(function() {
        done();
    }); 
  });

  it('user has an email and password property', function() {
    const user = new User({ email: 'test@test.com', password: 'MY_very_securePWD123!' });
    expect(user.email).toEqual('test@test.com');
    expect(user.password).toEqual('MY_very_securePWD123!');
  });

  it('Can test if an encrypted password matches', function(done) {
    const user = new User({ email: 'happy@test.com', password: 'MY_very_securePWD123!' });
    user.save(function(err) {
      expect(err).toBeNull();
      User.find({ email: 'happy@test.com' }, function(err, user) {
        if (err) throw err; 
        user[0].comparePassword('MY_very_securePWD123!', function(err, isMatch) {
          if (err) throw err;
          expect(isMatch).toBe(true); 
          done(); 
        }); 
      });
    });
  }); 

});