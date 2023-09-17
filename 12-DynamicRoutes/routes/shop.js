// IMPORT EXPRESS AND PATH
const express = require('express');
const path = require('path');
const fs = require('fs');

//IMPORT MAINPAGE CONTROLLER 
const mainPagecontroler = require('../controllers/mainPage')
const productController = require('../controllers/products')

//CREATE AN INSTANCE OF Router
const router = express.Router();

//DEFINE A DYNAMIC ROUTE FOR DESCRIPTION 

router.get('/products/:pID',productController.pDescription);

//DEFINE A DEFAULT ROUTE FOR THE ROOT PATH '/'
router.get('/',mainPagecontroler.getHomepage)

module.exports = router;

