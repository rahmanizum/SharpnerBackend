// IMPORT EXPRESS AND PATH
const express = require('express');
const path = require('path');

//CREATE AN INSTANCE OF Router
const router = express.Router();

//DEFINE A DEFAULT ROUTE FOR THE ROOT PATH '/'
router.get('/',(request,response,next)=>{
    // Send a response form for all incoming requests
    // response.sendFile(path.join(__dirname,'../','views','home.html'));
    response.sendFile('home.html', { root: 'views' });

})
//CREATE A MIDDLE WARE FOR COTACT US
router.get('/contactus',(request,response,next)=>{
    response.sendFile('contactus.html',{root: 'views'})
})
module.exports = router;

