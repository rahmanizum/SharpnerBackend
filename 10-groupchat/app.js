const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({extended:false}))

app.use('/login',(request,response,next)=>{
    response.send('<form action="/" method="post"><input type="post" placeholder="Enter your Name" name = "userName"> <button> Submit</button> </form>');
});

app.post('/',(request,response,next)=>{
    console.log(request.body);
const {message,userName} = request.body;
if(message&& userName)fs.appendFileSync('chatHistory.txt',`${userName}:${message}\n`);
const chatData = fs.readFileSync('chatHistory.txt','utf8')
response.send(`
<p>${chatData}</p>
<form action="/" method="post" id="chatForm"><input type="text" placeholder="Your Message" name = "message"> <button> Send</button>  </form>
<script>
localStorage.setItem('userName', '${userName}');
const userName = localStorage.getItem('userName');
console.log(userName);
if (userName) {
  const form = document.getElementById('chatForm');
  const userNameInput = document.createElement('input');
  userNameInput.type = 'hidden';
  userNameInput.name = 'userName';
  userNameInput.value = userName;
  form.appendChild(userNameInput);
}
</script>

`)
})



app.listen(3002,()=>{
    console.log("Server is running on port 3002");
})