// IMPORT EXPRESS AND FS
const express = require('express');

//CREATE AN INSTANCE OF Router
const router = express.Router();

//DEFINE A DEFAULT ROUTE FOR THE ROOT PATH '/'
router.use('/',(request,response,next)=>{
    // Send a response form for all incoming requests
    response.send('<h1> This is Home page</h1> <form action ="/add-product" method="get"> <button>Add your product</button></form>')
})

module.exports = router;