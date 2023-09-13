
const express = require(`express`);
const app = express();

app.use((request,response,next)=>{
console.log('in the middle ware');
next();
})
app.use((request,response,next)=>{
console.log('in the second middle ware');
})

app.listen(3000);