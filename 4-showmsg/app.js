//IMPORT MODULES
const http = require(`http`);
const fs = require('fs');

//CREATING SERVER

const server = http.createServer((request,response)=>{
    console.log(request.url);
    if(request.url==='/'){
        fs.readFile('C:\\Users\\HP\\Desktop\\ShrpnerBackend\\4-showmsg\\index.html','utf-8',(err,content)=>{
            if(err) return response.end('Something went wrong');
            return response.end(content);
        })
    }
    if (request.url === '/favicon.ico') {
        console.log(request.url);
        console.log(request.method);
    }
    
    if(request.url==='/submit' && request.method==='POST'){
        console.log('success');
        let body ='';
        request.on('data',(chunk)=>{
            body+= chunk.toString();
        });
        request.on('end',()=>{
            fs.appendFile('message.txt',`${body}\n`,(err)=>{
                const formData = new URLSearchParams(body);
                const Name = formData.get('userName');
                const userMsg = formData.get('userMsg');
                console.log(Name);
                console.log(userMsg);
                fs.readFile('C:\\Users\\HP\\Desktop\\ShrpnerBackend\\4-showmsg\\index.html','utf-8',(err,content)=>{
                    if(err) return response.end('Something went wrong');
                    const updatedContent = content.replace('{{Name}}', Name).replace('{{userMsg}}', userMsg);
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(updatedContent);
                })
            })
        })
    }
})

//LOGGING WHEN WE START LISTENING ON A 8080 PORT
server.listen(8080,()=>{
    console.log("Listening on port:8080");     
});