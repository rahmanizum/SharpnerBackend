// IMPORT EXPRESS
const express = require('express');

//CREATE AN INSTANCE OF THE EXPRESS APPLICATION
const app = express();

//DEFINE A ROUTE FOR THE /add-product PATH
app.post('/add-product',(request, response, next) => {
    // Send a response just for /add-product incoming requests
    response.send('<form action="/product" method="post"> <input type="text" name="product"><button>Add product</submit></form> ');
})

//DEFINE A ROUTE FOR THE /product PATH
app.post('/product',(request,response,next)=>{
    // Send a response just for /product incoming requests
    response.send('<h1>This is cart page </h1>')
})
//DEFINE A DEFAULT ROUTE FOR THE ROOT PATH '/'
app.get('/',(request,response,next)=>{
    // Send a response form for all incoming requests
    response.send('<h1> This is Home page</h1> <form action ="/add-product" method="post"> <button>Add your product</button></form>')
})
//START THE SERVER AND LISTEN ON PORT 3000

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
