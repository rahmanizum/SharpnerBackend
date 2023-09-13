// IMPORT EXPRESS
const express = require('express');

//CREATE AN INSTANCE OF THE EXPRESS APPLICATION
const app = express();

//DEFINE A ROUTE FOR THE /product PATH
app.use('/product',(request,response,next)=>{
    response.send('<h1>This is cart page </h1>')
})
//DEFINE A ROUTE FOR THE /add-product PATH
app.use('/add-product',(request, response, next) => {
    // Send a response form for all incoming requests
    response.send('<form action="/product" method="post"> <input type="text" name="product"><button>Add product</submit></form> ');
})
//DEFINE A DEFAULT ROUTE FOR THE ROOT PATH '/'
app.use('/',(request,response,next)=>{
    response.send('<h1> This is Home page</h1> <form action ="/add-product" method="post"> <button>Add your product</button></form>')
})
//STRAT THE SERVER AND LISTEN ON PORT 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
