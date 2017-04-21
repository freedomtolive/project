//入口文件

//加载express模块
var express = require('express');
//加载模板处理的模块
var swig = require('swig')
//加载数据库
var mongoose = require('mongoose')
//加载body-parse，用来处理post提交过来的数据
var bodyParser = require('body-parser')
//加载cookie模块
var Cookies = require('cookies');
//创建app应用 相当于nodejs中的 Http.createServer();
var app = express();

var User = require('./modules/User')

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
//在开发过程中需要取消模板引擎的缓存
swig.setDefaults({cache:false})//将缓存定位false，取消缓存

// 后面通过路由加载不同区域，所以此处不需要展示模板
// app.get('/',function(req,res,next){
// 	
// 	//读取views目录下的指定文件，解析并返回给客户端
// 	//第一个参数表示模板的文件，相对于views目录 会去找:views/index.html
// 	//第二个参数表示传递给模板使用的数据
// 	res.render('index');
// })

// app.get('/main.css',function(req,res,next){
// 	//告诉浏览器解析的是一个css文件
// 	res.setHeader('content-type','text/css')
// 	res.send('body{background:red}')
// })


//利用中间件，进行body-parser设置
	//由于ajax传的数据大部分都用url转化过，所以此处需要用bodyParser.urlencoded()转义
app.use(bodyParser.urlencoded({extended:true}))
//调用此方法后，如前端用ajax传输数据，接手时会在req上增加一个body属性，该属性的值就是post提交的转化后的值

//设置cookies
app.use(function(req,res,next){
	req.cookies = new Cookies(req, res);
	//解析登录用户的cookie信息
    req.userInfo = {};

	if(req.cookies.get('userInfo')){
		try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            //获取当前登录用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function(userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        }catch(e){
            next();
        }

	}else{
		next();
	}
})


//根据不同的功能划分模块
app.use('/admin',require('./routers/admin'))	 //用来做后端数据
app.use('/api',require('./routers/api'))	//用来做api(模拟后端)
app.use('/',require('./routers/main')) //用来做前端展示(前端展示)

//链接数据库
mongoose.connect('mongodb://localhost:27017/blog',function(err){
				//链接协议	//链接地址	//链接的数据库
	if(err){
		console.log("数据库链接失败")
	}else{
		console.log("数据库链接成功")
		//监听请求 
		app.listen(8080)
	}
})



//用户发送http请求 -> url -> 解析路由 -> 找到匹配的规则 -> 执行指定的绑定函数,返回对应的内容至用户
//
///public -> 静态 -> 直接读取制定目录下的文件，返回给用户
//->动态 -> 处理业务逻辑 -> 加载模板，解析模板 -> 返回数据给用户