
//IMPORT FS 
const fs = require('fs').promises;

//CREATE A CLASS OF PRODUCT AND THEN EXPORTS 

module.exports = class Product {
    constructor(id,pName, pPrice,pQuantity,pDescription) {
        this.obj = {
            id : id,
            pName: pName,
            pQuantity:pQuantity,
            pPrice: pPrice,
            pDescription:pDescription,
            imgID: Math.floor(Math.random()*10)
        };
    }
    //mehod to save data to array
   async save() {
    try{
        const data = await fs.readFile('./data/dataBase.json','utf-8');
        if(data==="") await fs.writeFile('./data/dataBase.json',JSON.stringify([this.obj]));
        else{
            let productArr = JSON.parse(data);
            productArr.push(this.obj);
            await fs.writeFile('./data/dataBase.json',JSON.stringify(productArr));

        }
    }catch(err){
        console.log(err);
    }

        
    }
    //static method to fetch array 
    static async fetchAll() {
        try{
            return await  fs.readFile('./data/dataBase.json','utf-8')
        }catch(err){
            console.log(err);
        }
    }
    //static method to fetch object by id
    static async fetchbyId(pID){
        try{
            const data =await fs.readFile('./data/dataBase.json','utf-8');
            const singleObject = await JSON.parse(data).find(element => (element.id === pID));
            return singleObject;
        }catch(err){
            console.log(err);
        }
    }
    static async removebyId(id){
        try{
           //get cart data from file
           const productData = await fs.readFile('./data/dataBase.json', 'utf-8');  
           const productArr = JSON.parse(productData);
           //find index of produt to remove entirely 
           const indexofProduct = productArr.findIndex(element => element.id === id);
           //using splice remove that product
           productArr.splice(indexofProduct,1);
           // Write the updated cart data back to the file
           await fs.writeFile('./data/dataBase.json', JSON.stringify(productArr));

        }catch(err){
            console.log(err);
        }
    }
};


//while handling with database always keep in mind play of asynchrounous operations