// var Profile = require('../models/'); 
var ProfileController = {
    Index: function(req, res) {
        res.render('./profile/index'); 
    }
};

module.exports= ProfileController; 