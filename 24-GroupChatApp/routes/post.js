const express = require('express');
const postController = require('../controllers/post')
const router = express.Router();
router.post('/chat',postController.addChat)
module.exports = router;