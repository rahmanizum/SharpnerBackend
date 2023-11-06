const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());

const maninRoute = require('./routes/home')
const PORT = process.env.PORT;
app.use(maninRoute)
app.listen(PORT,()=>{
    console.log(`Server is running on port${PORT}`);
})