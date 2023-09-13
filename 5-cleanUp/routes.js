const htmlContent1 = `
<!DOCTYPE html>
<html>
<head>
    <title>My HTML Page</title>
</head>
<body>
    <h1>Hello, User Name or Password Incorrect</h1>
    <p>This is an HTML page served by Node.js.</p>
</body>
</html>
`;
const htmlContent2 = `
<!DOCTYPE html>
<html>
<head>
    <title>My HTML Page</title>
</head>
<body>
    <h1>Hello, Invalid URL </h1>
    <p>This is an HTML page served by Node.js.</p>
</body>
</html>
`;
const fs = require('fs');

//REQUEST HANDLER FUNCTION
const requesthandler = (req,res)=>{
    //FOR BASIC URL
    if(req.url === '/'){
        fs.readFile('login.html','utf-8',(err,content)=>{
            if(err){
                console.log(err);
            }
            res.setHeader('Content-Type','text/html');
           return res.end(content);
    
        })
    }
    //IF PASSWORD AND USERNAME ARE CORRECT
    else if (req.url === '/submit' && req.method==='POST') {
        let body = '';
        req.on('data', (chunk) => {
            body+=chunk.toString();
        });
    
        req.on('end', () => {
            fs.appendFileSync(`password.txt`,`${body}\n`,'utf-8');
            const formData = new URLSearchParams(body);
            const checkName = formData.get('userName');
            const checkpass = formData.get('password');
            if (checkName === 'mufil' && checkpass === '1234') {
                fs.readFile('main.html', 'utf-8', (err, content) => {
                    if (err) {
                        console.log(err);
                    }
                    res.setHeader('Content-Type', 'text/html');
                    return res.end(content);
                });
            } else {
                res.setHeader('Content-Type', 'text/html');
                return res.end(htmlContent1);
            }
        });
    } 
    //FOR INCORRECT URL
    else{
        res.setHeader('Content-Type','text/html');
        return res.end(htmlContent2);
    }
}
module.exports = requesthandler;