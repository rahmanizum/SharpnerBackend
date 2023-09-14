const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({extended:false}))

app.use('/login',(request,response,next)=>{
    response.send(`<form onsubmit="localStorage.setItem('userName',document.getElementById('userName').value)" action="/" method="get">
    <input type="text" placeholder="Enter your Name" name = "userName" id ="userName" >
    <button type="submit"> Add</button>
</form>`);
});

app.get('/',(request,response,next)=>{
    response.send(
        `<form onsubmit="document.getElementById('userName').value = localStorage.getItem('userName')" action="/" method="post">
    <input type="text" placeholder="Enter your message" name = "message" required>
    <input  name = "userName" id ="userName" type="hidden" >
    <button type="submit"> Add</button>
</form>`  
    )
})
app.post('/',(request,response,next)=>{
    console.log(request.body);
const {message,userName} = request.body;
fs.appendFileSync('chatHistory.txt',`${userName}:${message}\n`);
const chatData = fs.readFileSync('chatHistory.txt','utf8')
response.send(`
<p>${chatData}</p>
<form onsubmit="document.getElementById('userName').value = localStorage.getItem('userName')" action="/" method="post">
    <input type="text" placeholder="Enter your message" name = "message" required >
    <input name = "userName" id ="userName" type="hidden" >
    <button type="submit"> Add</button>
</form>

`)
})



app.listen(3002,()=>{
    console.log("Server is running on port 3002");
})