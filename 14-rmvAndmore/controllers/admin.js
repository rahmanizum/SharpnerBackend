//IMPORT GLOABLE FS
const fs = require('fs').promises;

const Product = require('../models/product')

exports.getproductlistPage = (request,response,next)=>{
    response.sendFile('productList.html',{root:'views/admin'});
}

exports.getallproductData = async (request,response,next)=>{
try{
    const pData =await Product.fetchAll();
    response.send(pData);
}catch(error){
    console.log(error);
}
}

exports.addtoproductData = async(request,response,next)=>{
    const { id, productName, pPrice, pQuantity, pDescription} = request.body;
    try{
        // Create a new product
        const product = new Product(id, productName, pPrice, pQuantity, pDescription);
        // Save the product to the database
        product.save();

    }catch(err){
        console.log(err);
    }
}


exports.removefromProductData = async(request,response,next)=>{
    const rID = request.params.rID;
    try{
        Product.removebyId(rID);
        response.sendFile('productList.html',{root:'views/admin'});
    }catch(err){
        console.log(err);
    }
}

exports.editproductData = async(request,response,next)=>{
    const eID = request.params.eID;
    try{
        const uniqueProduct = await Product.fetchbyId(eID);
        response.send(uniqueProduct);
    }catch(err){
        console.log(err);
    }
}