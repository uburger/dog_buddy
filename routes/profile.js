const express = require('express');
const router = express.Router();

const ProfileController = require('../controllers/profile');
const store = require('../middleware/multer');
//
// eslint-disable-next-line no-unused-vars
router.get('/', function(req, res, next) {
    res.render('./profile/index', { title: 'Express' });
  });

router.get('/profile', ProfileController.Index);
// router.post('/profile', ProfileController.Create); 

// post request using the form '/uploadphoto' it stores single image in uploads folder and execute upload method
router.post('/uploadphoto',store.single('profileImage',1),ProfileController.Uploads)

module.exports = router;