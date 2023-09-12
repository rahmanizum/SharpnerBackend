//IMPORTING MODULES 
const http = require(`http`);
const fs = require(`fs`);

//CREATING SERVER

const server = http.createServer((request,response)=>{
    if(request.url=='/home') return response.end('Welcome Home');
    if(request.url=='/about') return response.end('Welcome to About Us page');
    if(request.url=='/node') return response.end('Welcome to my Node Js project');
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('404 Not Found');
})

//LOGGING WHEN WE START LISTENING ON A 1000 PORT
server.listen(1000,()=>{
    console.log("Listening on port:1000");     
});



