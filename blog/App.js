//入口文件

//加载express模块
var express = require('express');

//创建app应用 相当于nodejs中的 Http.createServer();
var app = express();

app.get('/',function(req,res,next){
	res.send('<h1>欢迎来到我的博客</h1>')
})

//监听请求 
app.listen(8080)