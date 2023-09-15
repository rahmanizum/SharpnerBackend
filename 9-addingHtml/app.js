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
app.use('/admin',AdminRouter);

//CREATE A MIDDLE WARE FOR SHOP 
app.use(shopRouter);

//CREATE A MIDDLE WARE FOR ERROR 
app.use((reuest,response,next)=>{
    response.status(404).sendFile('notFound.html',{root:'views'});
})
//START THE SERVER AND LISTEN ON PORT 3000
app.listen(3030, () => {
    console.log("Server is running on port 3030");
})
