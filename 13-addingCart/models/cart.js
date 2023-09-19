const fs = require('fs').promises; // Import the 'promises' version of the fs module
const Product = require('./product'); // Import the Product class if it exists

module.exports = class Cart {
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
                newProduct.noItem = "1"; 
                cartArr.push(newProduct);
            } else {
                // Product already exists in the cart, so increase its quantity
                cartArr[duplicateIndex].noItem = (parseInt(cartArr[duplicateIndex].noItem) + 1).toString();
            }

            // Write the updated cart data back to the file
            await fs.writeFile('./data/cartData.json', JSON.stringify(cartArr));

        } catch (err) {
            console.error(err);
        }
    }
    static async fetchAll(){
        try{
           return await fs.readFile('./data/cartData.json', 'utf-8');
        }
        catch(err){
            console.log(err);
        }
    }
    static async delete1Product(id){
        try{
            const cartData = await fs.readFile('./data/cartData.json', 'utf-8');  
            const cartArr = JSON.parse(cartData);
            const indexofProduct = cartArr.findIndex(element => element.id === id);
            if(parseInt(cartArr[indexofProduct].noItem)===1) {
                  cartArr.splice(indexofProduct,1);
            }else{
                cartArr[indexofProduct].noItem = (parseInt(cartArr[indexofProduct].noItem)-1);
            }

            await fs.writeFile('./data/cartData.json', JSON.stringify(cartArr));

        }catch(err){
            console.log(err);
        }
    }
    static async removeProduct(id){
        try{
            const cartData = await fs.readFile('./data/cartData.json', 'utf-8');  
            const cartArr = JSON.parse(cartData);
            const indexofProduct = cartArr.findIndex(element => element.id === id);
            cartArr.splice(indexofProduct,1);
            await fs.writeFile('./data/cartData.json', JSON.stringify(cartArr));
        }catch(err){
            console.log(err);
        }  
    }
};
