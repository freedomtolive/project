//首页模块
var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
	//render函数的第二个参数就是传递给模板的参数
	res.render('main/index.html',{
		userInfo: req.userInfo
	}) //如果路由匹配到/则让页面渲染views下的main下面的index.html
})

//将路由返回出去
module.exports = router