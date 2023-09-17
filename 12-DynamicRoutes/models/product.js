
//IMPORT FS 
const fs = require('fs');

//CREATE A CLASS OF PRODUCT AND THEN EXPORTS 

module.exports = class Product {
    constructor(id,pName, pQuantity,pDescription) {
        this.obj = {
            id : id,
            pName: pName,
            pQuantity: pQuantity,
            pDescription:pDescription
        };
    }
    //mehod to save data to array
    save() {
        fs.readFile('./data/dataBase.json','utf-8',(err,data)=>{
            if(data==="") fs.writeFileSync('./data/dataBase.json',JSON.stringify([this.obj]));
            else{
                let productArr = JSON.parse(data);
                productArr.push(this.obj);
                fs.writeFileSync('./data/dataBase.json',JSON.stringify(productArr));
            }
        })
        
    }
    //static method to fetch array 
    static fetchAll() {
        return fs.readFile('./data/dataBase.json','utf-8',(err,data)=>{
            if(err) return [];
            return JSON.parse(data);
        });
    }
};


//while handling with database always keep in mind play of asynchrounous operations