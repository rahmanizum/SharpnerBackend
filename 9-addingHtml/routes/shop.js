// IMPORT EXPRESS
const express = require('express');

//CREATE AN INSTANCE OF Router
const router = express.Router();

//DEFINE A DEFAULT ROUTE FOR THE ROOT PATH '/'
router.get('/shop',(request,response,next)=>{
    response.send('<h1> This is Shop page</h1> <form action ="/add-product" method="get"> <button>Add your product</button></form>')
})

module.exports = router;