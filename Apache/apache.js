//模拟apache处理静态资源

//加载http
var http = require("http");
var path = require("path");
var fs = require("fs");
var mime = require("mime");

http.createServer(function(req,rep){
//获取static目录的完整路径
var staticDir = path.join(__dirname,'static');
//根据static的路径和用户请求的路径，最终计算出用户请求的静态资源的完整路径；
var fileDir=path.join(staticDir,req.url);
//console.log(fileDir);
//根据文件的完整路径去读取文件，如果读取到了，则把文件返回给用户，如果读取不到，返回404
fs.readFile(fileDir,function(err,data){
    console.log(err);
    if(err){
        rep.setHeader("Content-type",'text/plain;charset=utf-8');
        rep.end("文件不存在,404");
    }else{
        //根据不同的文件，设置不同的Content-Type，使用mime模块
        console.log(mime);
        rep.setHeader("Content-Type",mime.getType(fileDir));
        //找到了用户读取的文件，直接返回
        rep.end(data);
    }
});

}).listen(8080,function(){
    console.log("服务器启动了....");
});