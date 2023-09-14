// IMPORT EXPRESS AND FS
const express = require('express');
const fs = require('fs');

//CREATE AN INSTANCE OF Router
const router = express.Router();

//DEFINE A ROUTE FOR THE /add-product PATH
router.get('/add-product',(request, response, next) => {
    // Send a response form for all incoming requests
    response.send('<form action="/product" method="post"><input type="text" name="product" placeholder="Product Name"><input type="number" name="product" placeholder="Product Size"><button>Add product</submit></form> ');
})

//DEFINE A ROUTE FOR THE /product PATH
router.post('/product',(request,response,next)=>{
    const body = request.body;
    fs.appendFile('productData.txt',`${body.product}\n`,(err)=>{
        if(err) console.log(err);
        response.send(`<h1>This is cart page </h1> <h2>product name: ${body.product[0]} <br> size: ${body.product[1]}`)
    })
})

//EXPORT CREATED MODULE

module.exports = router;