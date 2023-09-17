
//IMPORT GLOABLE FS
const fs = require('fs');

//IMPORT LOCAL MODEL CLASS TO MANAGE DATA BASE 
const Product = require('../models/product');

//CREATE CONROLLERS RELATED TO PRODUCT AND THEN EXPORTS 
exports.getAddProduct = (request, response, next) => {
    // Send a response just for admin/add-product incoming requests
    response.sendFile('add-product.html', { root: 'views' });
}

exports.listProduct = (request, response, next) => {
    //get body to pass to browser
    const {id, productName, pQuantity,pDescription} = request.body;
    //add the product to data base using models
    const product = new Product(id,productName, pQuantity,pDescription);
    product.save();

    //append details to Data base
    const htmlData = fs.readFileSync('./views/listed-product.html', 'utf-8');
    const newProductCard = fs.readFileSync('./views/cardContent.html', 'utf8').replace(/{{pName}}/g,productName).replace(/{{quatity}}/g,pQuantity).replace(/{{pID}}/g, id);
    const placeholderIndex = htmlData.indexOf('<div id="product-card-placeholder"></div>');
    if (placeholderIndex !== -1) {
        const modifiedHtmlData =
            htmlData.slice(0, placeholderIndex) + newProductCard + htmlData.slice(placeholderIndex);
        //   fs.writeFileSync('./views/listed-product.html',modifiedHtmlData);
        response.send(`${modifiedHtmlData}`);

    } else {
        // Handle the case where the placeholder was not found
        console.error('Placeholder not found in the HTML.');
    }
}

exports.pDescription = (request, response) => {
    //get id from the button 
    const pID= request.params.pID;
    //get data from database and modify the html content
    fs.readFile('./views/pDescription.html','utf-8',(err,data)=>{
        if(err) console.log(err);
        const productArr = JSON.parse(fs.readFileSync('./data/dataBase.json','utf-8'));
        const{pName,pQuantity,pDescription} = productArr.find(value=>(value.id===pID))
        const modifiedHtmlData = data.replace(/{{pName}}/g,pName).replace(/{{pQuantity}}/g,pQuantity).replace(/{{pDescription}/g, pDescription);
        response.send(modifiedHtmlData);
    })
    
  }