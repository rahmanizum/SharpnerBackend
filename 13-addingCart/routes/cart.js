// IMPORT EXPRESS 
const express = require('express');

//IMPORT CART CONTROLLER 
const cartController = require('../controllers/cart');

//CREATE AN INSTANCE OF Router
const router = express.Router();

router.get('/productData',cartController.getfromCart);

router.get('/delete/:dID',cartController.delete1fromCart);

router.get('/remove/:rID',cartController.removeFromCart);

router.get('/add/:pID',cartController.addtoCart);

router.get('',(request,response,next)=>{
    response.sendFile('cart.html',{root:'views'});
})
module.exports = router;