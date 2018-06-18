
//1.加载http模块
var http=require("http");

//2.创建http服务
var server = http.createServer();

//3.监听用户的请求事件（request事件）
//request对象包含了用户请求报文中的所有的内容
//response对象用来向用户相应数据，
server.on('request',function(request,response){
    //request.url可以获取用户的请求路径

    //console.log(request);
    //解决乱码的思路：服务器通过设置Http响应报文头,告诉浏览器使用响应的编码来解析
    //response.setHeader("Content-type",'text/plain;charset=utf-8');//text/plain:纯文本
    response.setHeader("Content-type",'text/html;charset=utf-8');//响应HTMl
    //响应数据
    response.write("欢迎访问http服务"); //出现乱码
    response.write("<br/>")
    response.write("<h2>响应HTML</h2>")
    

    //对于每一个请求，服务器必须结束响应，不然客户端（浏览器）会一直等待；
    response.end()
});

//4.启动服务
server.listen(8080,function(){
    console.log("服务器启动了。。。")
});