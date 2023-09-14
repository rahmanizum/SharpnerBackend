// IMPORT EXPRESS 
const express = require('express');

//IMPORT LOCAL MODULES
const AdminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

//CREATE AN INSTANCE OF THE EXPRESS APPLICATION
const app = express();

//CREATE A MIDDLE WARE DOING PARSING 
app.use(express.urlencoded({extended:false}));

//CREATE A MIDDLE WARE FOR ADMIN
app.use(AdminRouter);

//CREATE A MIDDLE WARE FOR SHOP 
app.use(shopRouter);

//CREATE A MIDDLE WATE FOR STATUS CODE 404

app.use('/',(request,response,next)=>{
    response.status(404).send(`<h1>404 - Page Not Found</h1>
    <h4>The page you are looking for might have been removed or is temporarily unavailable.</h4>`);
})

//START THE SERVER AND LISTEN ON PORT 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
