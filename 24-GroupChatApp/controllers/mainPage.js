exports.getHomepage = (request,response,next)=>{
    response.sendFile('home.html',{root:'views'});
}
exports.getErrorpage = (request,response,next)=>{
    response.sendFile('notfound.html',{root:'views'});
}