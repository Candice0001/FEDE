//根据用户的不同请求，服务器做出不同的响应
//根据用户不同的请求，服务器做出不同的响应（响应现有的html文件）

//1.加载http模块
var http=require("http");
//加载读取文件页面
var fs=require("fs");
//加载path模块，便于拼接路径
var path=require("path");

//2.创建http服务 var server=http.createServer();
//3.监听用户的请求事件（request事件）server.on('request',function(req,rep){});
//request对象包含了用户请求报文中的所有的内容server.listen(8080,function(){});
//response对象用来向用户相应数据
//4.启动服务
http.createServer().on('request',function(request,response){
    //request.url可以获取用户的请求路径
    console.log(request.url);
    //console.log(request);
    
    if(request.url === "/" || request.url === "/index"){
        //解决乱码的思路：服务器通过设置Http响应报文头,告诉浏览器使用响应的编码来解析
        //response.setHeader("Content-type",'text/plain;charset=utf-8');//text/plain:纯文本
        response.setHeader("Content-type",'text/html;charset=utf-8');//响应HTML
        //响应数据
        response.write("欢迎访问http服务"); //出现乱码
        response.write("<br/>")
        response.write("<h2>响应HTML</h2>")//向客户端写简单的html
        //对于每一个请求，服务器必须结束响应，不然客户端（浏览器）会一直等待；
         response.end()
    }else if(request.url === "/login"){ //向客户端写文本
        response.end("login page and end")
    }else if(request.url === "/images/aa.png"){//处理图片
        fs.readFile(path.join(__dirname,'images','aa.png'),function(err,data){
            if(err){
                throw err;
            }

            response.setHeader("Content-Type","image/png");
            response.end(data);
        });
        
    }else if(request.url === "/css/welcome.css"){//处理css文件
        fs.readFile(path.join(__dirname,'css','welcome.css'),function(err,data){
            if(err){
                throw err;
            }

            response.setHeader("Content-Type","text/css");
            response.end(data);
        });
    }else if(request.url === "/welcome"){//x响应html页面
        //读取html文件
        //不设置编码时返回的是buffer，设置utf8编码返回的是字符串
        fs.readFile(path.join(__dirname,'htmls','welcome.html'),function(err,data){
            if(err){
                throw err;
            }
            //把读取到的welcome.html文件中的内容直接传给浏览器
            //welcome.html中设置了编码格式，则不需要在请求报文头中设置编码
            response.end(data);//此方法既可以传字符串也可以传buffer
        });
    }else{
        response.end("404,not found")
    }


    
}).listen(8080,function(){
    console.log("服务器启动了。。。")
});