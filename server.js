var express = require('express');

var proxyMiddleWare = require("http-proxy-middleware");
var proxyPath = "http://localhost:8080";//目标后端服务地址

var proxyOption ={
    target:proxyPath,//需要代理的域名
    changeOrigoin:false
}

var app = express();//创建一个app对象，类似于创建一个server对象
    app.use(express.static("./public"))//这段程序的作用是将我们的前端项目设置成静态资源这样我们在浏览器中就可以直接通过http://127.0.0.1:xxxx/xxx(所在页面的目录层级)访问我们的页面,做到边开发边调试.

    app.use("/blog",proxyMiddleWare(proxyOption))//这里要注意"/login" 是匹配的路由,它会将匹配的路由进行转发，没匹配到的就不会转发。
    //启动服务
    var server = app.listen(8080,function(){
        var host = server.address().address;
        var port = server.address().port;
 
         console.log("访问地址为 http://%s:%s", host, port)
    });