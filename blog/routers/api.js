var express = require('express');
var router = express.Router();
var User = require('../modules/User'); //返回的是一个构造函数

//统一返回格式
var responseData

//对返回的值进行初始化的处理
router.use(function(req,res,next){
	responseData = {
		code:0,
		message:''
	}

	//使用了next函数才会继续执行函数
	next();
})

//用户注册
	//注册逻辑
	//1.用户名不能为哦空
	//2.密码不能为空
	//3.两次输入密码必须一致
	//4.用户名是否已经被注册(需要用到数据库的查询)
router.post('/user/register',function(req,res,next){
	//调用bodyParser.urlencoded()方法后，如前端用ajax传输数据，接手时会在req上增加一个body属性，该属性的值就是post提交的转化后的值
	var username = req.body.username;
	var password = req.body.password;
	var repassword = req.body.repassword;

	console.log(username,password,repassword)
	console.log(responseData)
	
	if(username === ''){
		responseData.code = 1;
		responseData.message = '用户名不能为空';
		res.json(responseData);
		return
	}
	if(password===''){
		responseData.code = 2;
		responseData.message = "密码不能为空";
		res.json(responseData);
		return
	}
	if(password!=repassword){
		responseData.code = 3;
		responseData.message = "两次输入密码必须一致";
		res.json(responseData);
		return
	}
	
	//数据库查询
	//检测用户名是否重复
	//User.findOne()会返回一个promise对象
	User.findOne({
        username: username
    }).then(function(userInfo){
		if(userInfo){
			responseData.code = 4;
			responseData.message = "用户名已经被注册";
			res.json(responseData);
			return
		}
		//用户名没有被注册，保存用户的信息到数据库中
		var user = new User({
			username:username,
			password:password
		});
		return user.save(); //保存user数据到数据库中
	}).then(function(newUserInfo){
        // console.log(newUserInfo)
    	responseData.message = "注册成功";
		res.json(responseData)
	})

	
})



//将路由返回出去
module.exports = router