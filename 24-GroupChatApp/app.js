const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const sequelize = require('./util/database');
const User = require('./models/users');
const Forgotpasswords = require('./models/forgot-password');
const ChatHistory = require('./models/chat-history');


const maninRoute = require('./routes/home');
const userRoute = require('./routes/user');


const app = express();
app.use(cors({
  origin: '*',
  methods:['GET','POST'],

}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/user',userRoute)
app.use(maninRoute)

User.hasMany(Forgotpasswords);
Forgotpasswords.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(ChatHistory)
ChatHistory.belongsTo(User, { constraints: true });



const PORT = process.env.PORT;
async function initiate() {
    try {
     const res = await sequelize.sync();
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} `);
      })
    } catch (err) {
      console.log(err);
    }
  }
  initiate();