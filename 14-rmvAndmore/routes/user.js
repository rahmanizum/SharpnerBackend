// IMPORT EXPRESS AND PATH
const express = require('express');
const path = require('path');
const fs = require('fs');

//IMPORT CONTROLLERS 
const productController = require('../controllers/products');
const cartController = require('../controllers/cart');
const mainPagecontroler = require('../controllers//mainPage');

//CREATE AN INSTANCE OF Router
const router = express.Router();

//CREATE A ROUTER FOR USERS 
router.use('/listed-product',productController.userListProduct)

//DEFINE A DYNAMIC ROUTE FOR DESCRIPTION 
router.get('/products/:pID',productController.pDescription);

//DEFINE ROUTES FOR CART 
router.get('/cart/productData',cartController.getfromCart);

router.get('/cart/delete/:dID',cartController.delete1fromCart);

router.get('/cart/remove/:rID',cartController.removeFromCart);

router.get('/cart/add/:pID',cartController.addtoCart);

router.get('/',mainPagecontroler.getUserHomepage)

router.get('/cart',(request,response,next)=>{
    response.sendFile('cart.html',{root:'views/user'});
})


module.exports = router;

