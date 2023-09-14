// IMPORT EXPRESS AND FS
const express = require('express');
const fs = require('fs');

//CREATE AN INSTANCE OF THE EXPRESS APPLICATION
const app = express();

//CREATE A MIDDLE WARE DOING PARSING 
app.use(express.urlencoded({extended:false}));

//DEFINE A ROUTE FOR THE /add-product PATH
app.post('/add-product',(request, response, next) => {
    // Send a response just for /add-product incoming requests
    response.send('<form action="/product" method="post"> <input type="text" name="product"><button>Add product</submit></form> ');
})

//DEFINE A ROUTE FOR THE /product PATH
app.post('/product',(request,response,next)=>{
    //get body to pass to browser
    const addproduct = request.body;
    console.log(addproduct);
    //append product name to a text file 
    fs.appendFile('product.txt',`${addproduct.product}\n`,(err)=>{
     if(err) console.log(err);
    // Send a response just for /product incoming requests with product name
    response.send(`<h1>This is cart page </h1><h3>1. ${addproduct.product}</h3>`)
    })

})

//DEFINE A DEFAULT ROUTE FOR THE ROOT PATH '/'
app.use('/',(request,response,next)=>{
    // Send a response form for all incoming requests
    response.send('<h1> This is Home page</h1> <form action ="/add-product" method="post"> <button>Add your product</button></form>')
})

//START THE SERVER AND LISTEN ON PORT 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
