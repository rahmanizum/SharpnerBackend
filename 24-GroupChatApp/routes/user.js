const express = require('express');
const userControler = require('../controllers/user')
const passwordController = require('../controllers/password')
const mainPagecontroler = require('../controllers/mainPage')
const router = express.Router();
router.post('/signup',userControler.userSignup);
router.post('/signin',userControler.userSignin);
router.post('/forgotpassword',passwordController.userResetpasswordMail)
router.get('/reset/:forgotId', passwordController.userResetpasswordform)
router.post('/password-reset',passwordController.userResetpassword)
router.get('/',mainPagecontroler.getMainpage)
module.exports = router;