const express = require('express');
const userControler = require('../controllers/user')
const passwordController = require('../controllers/password')
const mainPagecontroler = require('../controllers/mainPage')
const authController = require('../authentication/user')
const router = express.Router();
router.post('/signup',userControler.userSignup);
router.post('/signin',userControler.userSignin);
router.post('/forgotpassword',passwordController.userResetpasswordMail)
router.get('/reset/:forgotId', passwordController.userResetpasswordform)
router.post('/password-reset',passwordController.userResetpassword)
router.post('/post-message',authController.authorization,userControler.saveChatHistory)
router.get('/get-message',authController.authorization,userControler.getUserChatHistory);
router.get('/get-user',authController.authorization,userControler.getcurrentuser)
router.get('/get-messages',userControler.getAllChatHistory);
router.get('/',mainPagecontroler.getMainpage)
module.exports = router;