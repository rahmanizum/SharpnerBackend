// IMPORT EXPRESS AND FS
const express = require('express');
const fs = require('fs');

//CREATE AN INSTANCE OF Router
const router = express.Router();

//DEFINE A ROUTE FOR THE /add-product PATH
router.get('/add-product',(request, response, next) => {
    // Send a response just for /add-product incoming requests
    response.send('<form action="/product" method="post"> <input type="text" name="product"><button>Add product</submit></form> ');
})

//DEFINE A ROUTE FOR THE /product PATH
router.post('/product',(request,response,next)=>{
    //get body to pass to browser
    const addproduct = request.body;
    console.log(addproduct);
    //append product name to a text file 
    fs.appendFile('product.txt',`${addproduct.product}\n`,(err)=>{
     if(err) console.log(err);
    // Send a response just for /product incoming requests with product name
    response.send(`<h1>This is cart page </h1><h3>1. ${addproduct.product}</h3>`)
    })
})


//EXPORT CREATED MODULE

module.exports = router;