const mongoose = require('mongoose');

beforeAll(function(done) {
  mongoose.connect('mongodb://localhost/PPPP_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', function() {
    done();
  });
});

afterAll(function(done) {
  mongoose.connection.close(true, function() {
    done();
  });
});
