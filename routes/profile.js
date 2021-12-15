const express = require('express');
const router = express.Router();

const ProfileController = require('../controllers/profile');
const store = require('../middleware/multer');

router.get('/', ProfileController.Index);
// post request using the form '/uploadphoto' 
//it stores single image in uploads folder and execute upload method
router.post('/uploadphoto',
  store.single('profileImage',1),
  ProfileController.Uploads
  )

  router.post('/bio', ProfileController.UpdateBio)

module.exports = router;