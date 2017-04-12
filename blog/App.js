//入口文件

//加载express模块
var express = require('express');
//加载模板处理的模块
var swig = require('swig')

//创建app应用 相当于nodejs中的 Http.createServer();
var app = express();

//静态文件托管(静态文件)
//当用户访问的请求的url当中是以'/public'时，那么直接返回对应__dirname + '/public'下的文件
app.use('/public',express.static(__dirname + '/public'))



//配置应用模板(动态文件)
//定义当前应用所使用的模板引擎
//第一个参数为模板引擎的名称，也是模板文件的后缀。 第二个参数表示解析处理末班内容的方法
app.engine('html',swig.renderFile)
//设置模板文件存放的目录
//第一个参数不能变更，必须是views，第二个参数是存放目录的路径
app.set('views','./views')
//注册所使用的模板引擎
//第一个参数必须是view engine，第二个参数和app.engine方法中的模引擎的名称(即第一个参数)一样
app.set('view engine','html')
//在开发过程中需要取消莫办引擎的缓存
swig.setDefaults({cache:false})//将缓存定位false，取消缓存


app.get('/',function(req,res,next){
	//读取views目录下的指定文件，解析并返回给客户端
	//第一个参数表示模板的文件，相对于views目录 会去找:views/index.html
	//第二个参数表示传递给模板使用的数据
	res.render('index');
})

// app.get('/main.css',function(req,res,next){
// 	//告诉浏览器解析的是一个css文件
// 	res.setHeader('content-type','text/css')
// 	res.send('body{background:red}')
// })

//根据不同的功能划分模块

//监听请求 
app.listen(8080)



//用户发送http请求 -> url -> 解析路由 -> 找到匹配的规则 -> 执行指定的绑定函数,返回对应的内容至用户
//
///public -> 静态 -> 直接读取制定目录下的文件，返回给用户
//->动态 -> 处理业务逻辑 -> 加载模板，解析模板 -> 返回数据给用户