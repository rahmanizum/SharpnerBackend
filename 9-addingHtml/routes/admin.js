// IMPORT EXPRESS AND FS
const express = require('express');
const fs = require('fs');

//CREATE AN INSTANCE OF Router
const router = express.Router();

//DEFINE A ROUTE FOR THE /admin/add-product PATH
router.get('/add-product',(request, response, next) => {
    // Send a response just for /add-product incoming requests
    response.sendFile('add-product.html',{root:'views'});
    
})

//DEFINE A ROUTE FOR THE /admin/product PATH
router.post('/listed-product',(request,response,next)=>{
    //get body to pass to browser
    const {productName,pQuantity} = request.body;
    console.log(productName,pQuantity);
    //append product name to a text file 
    fs.appendFile('product.txt',`${productName}: ${pQuantity}\n`,(err)=>{
     if(err) console.log(err);
     const htmlData = fs.readFileSync('./views/listed-product.html','utf-8');

     const newProductCard = `
    <div class="col-md-4 mb-4">
        <div class="card">
            <div class="card-header text-bg-primary text-center pt-3 pb-3">
                <h2>${productName}</h2>
            </div>
            <div class="card-body">
                <div class="text-center">
                    <h3>In stock: ${pQuantity}</h3>
                </div>
                <div class="text-center m-2">
                    <a href="/" class="btn btn-outline-danger m-2">Remove</a>
                </div>
            </div>
        </div>
    </div>
`;
const placeholderIndex = htmlData.indexOf('<div id="product-card-placeholder"></div>');
if (placeholderIndex !== -1) {
    const modifiedHtmlData =
      htmlData.slice(0, placeholderIndex) + newProductCard + htmlData.slice(placeholderIndex);
      console.log(typeof modifiedHtmlData);
    //   fs.writeFileSync('./views/listed-product.html',modifiedHtmlData);
      response.send(`${modifiedHtmlData}`);

  } else {
    // Handle the case where the placeholder was not found
    console.error('Placeholder not found in the HTML.');
  }   
    })
})


//EXPORT CREATED MODULE

module.exports = router;