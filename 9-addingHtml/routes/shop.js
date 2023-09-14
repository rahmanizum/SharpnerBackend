// IMPORT EXPRESS
const express = require('express');

//CREATE AN INSTANCE OF Router
const router = express.Router();

//DEFINE A DEFAULT ROUTE FOR THE ROOT PATH '/'
router.use('/',(request,response,next)=>{
    response.send('<h1> This is Home page</h1> <form action ="/add-product" method="post"> <button>Add your product</button></form>')
})

module.exports = router;