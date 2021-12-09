'use strict'

const mongoose = require('mongoose');
const DogEvent = require('../../models/dogevent');

require('../mongodb_helper')


describe('Save Location', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.dogevents.drop(function() {
          done();
      });
  });

  it('with LON and LAT', function() {
    const dogEvent = new DogEvent({ eventLat: '51', eventLon: '0.3' });
    expect(dogEvent.eventLat).toEqual('51');
    expect(dogEvent.eventLon).toEqual('0.3');
  });

  it('with LON and LAT in the db', function(done) {
    const dogEvent = new DogEvent({ eventLat: '51', eventLon: '0.3' });

    dogEvent.save(function(err) {
      expect(err).toBeNull();
      DogEvent.find(function(err, dogevents) {
        expect(err).toBeNull();
        expect(dogevents[0]).toMatchObject({ eventLat: '51', eventLon: '0.3' })
        done()
      });  
    });  
  });

});
