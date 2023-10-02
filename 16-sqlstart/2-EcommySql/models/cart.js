
const db = require('../util/database');
const Product = require('./product');

//CREATE A CLASS TO MANAGE DATA WITH DATABSE 

module.exports = class Cart {
    static async addProduct(pid) {
        try {
            const cartdata =  await db.execute(`SELECT * FROM ecomcart WHERE id=${pid}`);  
            const productdata = await  Product.fetchbyId(pid);      
            const{id,pName,pQuantity,pPrice,pDescription,imgID,noItem} = productdata;
                if (cartdata[0]=="") {   
                await db.execute("INSERT INTO `node-complete`.`ecomcart` (`id`, `pName`, `pQuantity`, `pPrice`, `pDescription`, `imgID`,`noItem`)"+`VALUES (${id}, '${pName}', ${pQuantity}, ${pPrice}, '${pDescription}', ${imgID} , ${noItem})`);
                
            } else {
                const{noItem} = cartdata[0][0];
                const newnum = noItem+1;
                await db.execute(`UPDATE \`node-complete\`.\`ecomcart\` SET \`noItem\` = '${newnum}' WHERE (\`id\` = '${pid}')`);  

            }

        } catch (err) {
            console.error(err);
        }
    }
    //CREATE A STATIC FUNCTION TO FECT ALL PRODUCTS IN CART
    static async fetchAll(){
        try{
            const data =  await db.execute('SELECT * FROM ecomcart');
            return data[0]
        }
        catch(err){
            console.log(err);
        }
    }
    //CREATE A STATIC FUNCTION TO DELETEPRODUCT WHEN PASS AN ID  
    static async delete1Product(pid){
        try{
            const data =  await db.execute(`SELECT * FROM ecomcart WHERE id=${pid}`);            
            const{noItem} = data[0][0];
            
            if(noItem>1) {
                const newnum = noItem-1;
                await db.execute(`UPDATE \`node-complete\`.\`ecomcart\` SET \`noItem\` = '${newnum}' WHERE (\`id\` = '${pid}')`); 
            }
            //if more the 1 product is there then decrease number by 1
            else{
                await db.execute(`DELETE FROM ecomcart WHERE id=${pid}`);
            }

        }catch(err){
            console.log(err);
        }
    }
    //CREATE A STATIC FUNCTION TO REMOVE ENTIRE PRODUCT WHEN PASS THE PRODUCT ID
    static async removeProduct(pid){
        try{
            await db.execute(`DELETE FROM ecomcart WHERE id=${pid}`);
        }catch(err){
            console.log(err);
        }  
    }
};
