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
    const user = new User({ email: 'test@test.com', password: '1234' });
    expect(user.email).toEqual('test@test.com');
    expect(user.password).toEqual('1234');
  });
});