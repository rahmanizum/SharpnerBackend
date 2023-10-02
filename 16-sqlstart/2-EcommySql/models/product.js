
//IMPORT POOL
const db = require('../util/database');


//CREATE A CLASS OF PRODUCT AND THEN EXPORTS 
module.exports = class Product {
    constructor(id,pName, pPrice,pQuantity,pDescription,imgID) {       
        this.id = id,
        this.pName= pName,
        this.pQuantity=pQuantity,
        this.pPrice= pPrice,
        this.pDescription=pDescription,
        this.imgID= imgID
    }

    //mehod to save data to array
    async save() {
    try{
        await db.execute("INSERT INTO `node-complete`.`ecomproducts` (`id`, `pName`, `pQuantity`, `pPrice`, `pDescription`, `imgID`)"+`VALUES (${this.id}, '${this.pName}', ${this.pQuantity}, ${this.pPrice}, '${this.pDescription}', ${this.imgID})`);

    }catch(err){
        console.log(err);
    }

        
    }
    //static method to fetch array 
    static async fetchAll() {
        try{
          const data =  await db.execute('SELECT * FROM ecomproducts');
          return data[0]
        }catch(err){
            console.log(err);
        }
    }
    //static method to fetch object by id
    static async fetchbyId(pID){
        try{
            const data =  await db.execute(`SELECT * FROM ecomproducts WHERE id=${pID}`);
            return data[0][0];
        }catch(err){
            console.log(err);
        }
    }
    static async removebyId(pid){
        try{
            await db.execute(`DELETE FROM ecomproducts WHERE id=${pid}`);
        }catch(err){
            console.log(err);
        }
    }
};



//while handling with database always keep in mind play of asynchrounous operations