
//CREATION OF HTTP AND HANDLER MODULE
const http = require('http');
const rqHandler = require('./routes')
console.log(rqHandler);
//CREATION OF SERVER 
const server = http.createServer(rqHandler)

//LINKING OF SERVER WITH PORT 
server.listen(3002,()=>{
    console.log("SERVER IS RUNNING");
});