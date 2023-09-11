const express = require(`express`);

const app = express();

 app.listen(`4000`,(req,res)=>{
    console.log('server is running');
 });
 app.get(`/`,(req,res)=>{
    res.send("Mufil rahman A");
})