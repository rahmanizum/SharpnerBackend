
const path = require('path');
//CREATE MAIN PAGE CONTROLLERS AND EXPORT

exports.getHomepage = (request,response,next)=>{
    // Send a response for get request '/' 
    // response.sendFile(path.join(__dirname,'../','views','home.html'));
    response.sendFile('home.html', { root: 'views' });
}

exports.getErrorPage = (reuest,response,next)=>{
    //Send response for all requests otherthan specified
    response.status(404).sendFile('notFound.html',{root:'views'});
}