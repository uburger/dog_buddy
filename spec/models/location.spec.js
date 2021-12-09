'use strict'

const mongoose = require('mongoose');
const Location = require('../../models/location');

require('../mongodb_helper')


describe('Save Location', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.locations.drop(function() {
          done();
      });
  });

  it('with LON and LAT', function() {
    const location = new Location({ eventLat: '51', eventLon: '0.3' });
    expect(location.eventLat).toEqual('51');
    expect(location.eventLon).toEqual('0.3');
  });

  it('with LON and LAT in the db', function(done) {
    const location = new Location({ eventLat: '51', eventLon: '0.3' });

    location.save(function(err) {
      expect(err).toBeNull();
      Location.find(function(err, locations) {
        expect(err).toBeNull();
        expect(locations[0]).toMatchObject({ eventLat: '51', eventLon: '0.3' })
        done()
      });  
    });  
  });

});
