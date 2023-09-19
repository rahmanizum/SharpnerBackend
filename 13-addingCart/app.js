// IMPORT EXPRESS 
const express = require('express');
const cors = require('cors');

//IMPORT LOCAL MODULES
const AdminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const cartRouter = require('./routes/cart');

//IMPORT MAIN PAGE CONROLLER 
const mainPagecontroler = require('./controllers/mainPage');

//CREATE AN INSTANCE OF THE EXPRESS APPLICATION
const app = express();

app.use(cors());

//CREATE A MIDDLE WARE DOING PARSING 
app.use(express.urlencoded({extended:false}));

//CREATING A MIDDLE WARE TO USE CSS FILE 
app.use(express.static('public'));

//CREATE A MIDDLE WARE FOR ADMIN
app.use('/admin',AdminRouter);

//CREATE A MIDDLE WARE FOR CART
app.use('/cart',cartRouter);

//CREATE A MIDDLE WARE FOR SHOP 
app.use(shopRouter);

//CREATE A MIDDLE WARE FOR ERROR AND USE CONTROLLER 
app.use(mainPagecontroler.getErrorPage)


//START THE SERVER AND LISTEN ON PORT 3000
app.listen(7070, () => {
    console.log("Server is running on port 7070");
})
