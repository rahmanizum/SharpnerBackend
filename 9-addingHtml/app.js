// IMPORT EXPRESS AND FS
const express = require('express');
const fs = require('fs');

//CREATE AN INSTANCE OF THE EXPRESS APPLICATION
const app = express();

//DEFINE A MIDDLE WARE TO PARSE BODY 
app.use(express.urlencoded({ extended: true }));

//DEFINE A ROUTE FOR THE /product PATH
app.use('/product',(request,response,next)=>{
    const body = request.body;
    console.log(body);
    response.send(`<h1>This is cart page </h1> <h2>product name: ${body.product[0]} <br> size: ${body.product[1]}`)
})
//DEFINE A ROUTE FOR THE /add-product PATH
app.use('/add-product',(request, response, next) => {
    // Send a response form for all incoming requests
    response.send('<form action="/product" method="post"><input type="text" name="product" placeholder="Product Name"><input type="number" name="product" placeholder="Product Size"><button>Add product</submit></form> ');
})
//DEFINE A DEFAULT ROUTE FOR THE ROOT PATH '/'
app.use('/',(request,response,next)=>{
    response.send('<h1> This is Home page</h1> <form action ="/add-product" method="post"> <button>Add your product</button></form>')
})
//STRAT THE SERVER AND LISTEN ON PORT 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})