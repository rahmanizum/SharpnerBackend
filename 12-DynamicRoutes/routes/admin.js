// IMPORT EXPRESS AND FS
const express = require('express');
const fs = require('fs');

//IMPORT CONTROLLER TO  ADD PRODUCT AND GET PRODUCT 
const productController = require('../controllers/products')


//CREATE AN INSTANCE OF Router
const router = express.Router();

//DEFINE A ROUTE FOR THE /admin/add-product PATH USING CONTROLLER 
router.get('/add-product', productController.getAddProduct)

//DEFINE A ROUTE FOR THE /admin/product PATH
router.post('/listed-product',productController.listProduct)


//EXPORT CREATED MODULE

module.exports = router;