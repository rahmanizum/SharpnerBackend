const fs = require('fs').promises; // Import the 'promises' version of the fs module
const Product = require('./product'); // Import the Product class if it exists

//CREATE A CLASS TO MANAGE DATA WITH DATABSE 

module.exports = class Cart {
    //CREATE A STATIC FUNCTION TO ADD PRODUCT TO CART
    static async addProduct(id) {
        try {
            // Read the cart data from a file
            const cartData = await fs.readFile('./data/cartData.json', 'utf-8');           

            // Find the index of the product with the given ID in the cart data
            const cartArr = JSON.parse(cartData);
            const duplicateIndex = cartArr.findIndex(element => element.id === id);
                if (duplicateIndex === -1) {   
                // Product not found in the cart, so add it
                const newProduct = await Product.fetchbyId(id);
                newProduct.noItem = 1; 
                cartArr.push(newProduct);
            } else {
                // Product already exists in the cart, so increase its quantity
                cartArr[duplicateIndex].noItem = cartArr[duplicateIndex].noItem + 1;
            }

            // Write the updated cart data back to the file
            await fs.writeFile('./data/cartData.json', JSON.stringify(cartArr));

        } catch (err) {
            console.error(err);
        }
    }
    //CREATE A STATIC FUNCTION TO FECT ALL PRODUCTS IN CART
    static async fetchAll(){
        try{
            //return total array of objects in cart
           return await fs.readFile('./data/cartData.json', 'utf-8');
        }
        catch(err){
            console.log(err);
        }
    }
    //CREATE A STATIC FUNCTION TO DELETEPRODUCT WHEN PASS AN ID  
    static async delete1Product(id){
        try{
            //get data from file
            const cartData = await fs.readFile('./data/cartData.json', 'utf-8');  
            const cartArr = JSON.parse(cartData);
            //get index of product with an id 
            const indexofProduct = cartArr.findIndex(element => element.id === id);
            //if the number of item is 1 need to remove entire product from cart 
            if(parseInt(cartArr[indexofProduct].noItem)===1) {
                //using splice remove that product
                  cartArr.splice(indexofProduct,1);
            }
            //if more the 1 product is there then decrease number by 1
            else{
                cartArr[indexofProduct].noItem = cartArr[indexofProduct].noItem-1;
            }
            // Write the updated cart data back to the file
            await fs.writeFile('./data/cartData.json', JSON.stringify(cartArr));

        }catch(err){
            console.log(err);
        }
    }
    //CREATE A STATIC FUNCTION TO REMOVE ENTIRE PRODUCT WHEN PASS THE PRODUCT ID
    static async removeProduct(id){
        try{
            //get cart data from file
            const cartData = await fs.readFile('./data/cartData.json', 'utf-8');  
            const cartArr = JSON.parse(cartData);
            //find index of produt to remove entirely 
            const indexofProduct = cartArr.findIndex(element => element.id === id);
            //using splice remove that product
            cartArr.splice(indexofProduct,1);
            // Write the updated cart data back to the file
            await fs.writeFile('./data/cartData.json', JSON.stringify(cartArr));
        }catch(err){
            console.log(err);
        }  
    }
};
