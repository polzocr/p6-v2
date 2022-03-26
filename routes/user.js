const express = require('express');
const router = express.Router();
const passwordValidation = require('../middleware/password');

const userCtrl = require('../controllers/user');

router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;