const express = require('express');

const userCtrl = require('../controllers/user-ctrl.js');

const router = express.Router();

router.post('/user', userCtrl.authUser);
router.post('/userRegister', userCtrl.addUser);

module.exports = router;