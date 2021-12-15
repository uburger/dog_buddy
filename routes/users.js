const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');

router.get('/new', UsersController.New);
router.post('/', UsersController.Create);
/* GET users listing. */
// eslint-disable-next-line no-unused-vars
router.get('/', UsersController.New)

module.exports = router;
