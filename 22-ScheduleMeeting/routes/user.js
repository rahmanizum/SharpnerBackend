const express = require('express');
const fs = require('fs');

const userController = require('../controllers/user');

const router = express.Router();
router.get('/schedule-meeting',userController.getSchedulepage);
router.post('/schedule-meeting/:dID',userController.postmeetingDetails);
router.get('/delete/:dID',userController.deletemeetingDeatils);
router.get('/increase/:rID',userController.increaseSlot);

router.get('/slotData',userController.getSlotDetails);
router.get('/meetingData',userController.getmeetingDetails);
module.exports=router;


