//IMPORT GLOABLE FS
const fs = require('fs').promises;
const db = require('../util/database');
const Cart = require('../models/cart')

//*******************************CONTROLLERS FOR USERS **********************************


exports.userListProduct = async (request, response, next) => {
    try {
        // Read the HTML file
        const htmlData = await fs.readFile('./views/user/listProduct.html', 'utf-8');

        // Read the JSON data from the database
        const data =  await db.execute(`SELECT * FROM ecomproducts`); 
        if (data !== "") {

            // Find the placeholder index in the HTML
            const placeholderIndex = htmlData.indexOf('<div id="product-card-placeholder"></div>');

            let startingHtmlData = htmlData.slice(0, placeholderIndex);

            // Generate HTML for each product in the database
            for (const element of data[0]) {
                const { id, pName, pPrice,imgID } = element;
                const newProductCard = await fs.readFile('./views/user/productCard.html', 'utf8');

                // Replace placeholders with actual data
                const replacedCard = newProductCard
                    .replace(/{{pName}}/g, pName)
                    .replace(/{{pPrice}}/g, pPrice)
                    .replace(/{{pID}}/g, id)
                    .replace(/{{imgID}}/g,`${imgID}.jpg`);

                startingHtmlData += replacedCard;
            }

            let modifiedHtmlData = startingHtmlData + htmlData.slice(placeholderIndex);
            response.send(modifiedHtmlData);
        }
        else{
            response.send(htmlData);
        }
    } catch (err) {
        console.error(err);
        // Handle errors and send an appropriate response
        response.status(500).send('Internal Server Error');
    }
};

exports.userpDescription = async (request, response) => {
    try {
        const pID = request.params.pID;
        const htmldata = await fs.readFile('./views/user/pDescription.html', 'utf-8');
        const data =  await db.execute(`SELECT * FROM ecomproducts WHERE id=${pID}`);          
        const{id,pName,pQuantity,pPrice,pDescription,imgID,noItem} = data[0][0];
        const modifiedHtmlData = htmldata
            .replace(/{{pName}}/g, pName)
            .replace(/{{pPrice}}/g, pPrice)
            .replace(/{{pQuantity}}/g, pQuantity)
            .replace(/{{pDescription}}/g, pDescription)
            .replace(/{{imgID}}/g,`${imgID}.jpg`)
            .replace(/{{pID}}/g,`${pID}`);
        response.send(modifiedHtmlData);

    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error');
    }

};

//*******************************CONTROLLERS FOR USERS CART **********************************

exports.getfromCart = async (request,response,next)=>{
try{
    const pData =await Cart.fetchAll();
    response.send(pData);
}catch(error){
    console.log(error);
}
}

exports.addtoCart = async(request,response,next)=>{
    const pID = request.params.pID;
    try{
        Cart.addProduct(pID);
        response.redirect('/user/listed-product');

    }catch(err){
        console.log(err);
    }
}

exports.delete1fromCart = async (request,response,next)=>{
    const dID = request.params.dID;
    try{
        Cart.delete1Product(dID);
        response.redirect('/user/cart');
    }catch(err){
        console.log(err);
    }
}

exports.removeFromCart = async(request,response,next)=>{
    const rID = request.params.rID;
    try{
        Cart.removeProduct(rID);
        response.redirect('/user/cart');
    }catch(err){
        console.log(err);
    }
}