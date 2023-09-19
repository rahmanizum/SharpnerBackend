//IMPORT GLOABLE FS
const fs = require('fs').promises;

const Cart = require('../models/cart')

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
        response.redirect('/listed-product');

    }catch(err){
        console.log(err);
    }
}

exports.delete1fromCart = async (request,response,next)=>{
    const dID = request.params.dID;
    try{
        Cart.delete1Product(dID);
        response.sendFile('cart.html',{root:'views'});
    }catch(err){
        console.log(err);
    }
}

exports.removeFromCart = async(request,response,next)=>{
    const rID = request.params.rID;
    console.log(rID);
    try{
        Cart.removeProduct(rID);
        response.sendFile('cart.html',{root:'views'});
    }catch(err){
        console.log(err);
    }
}