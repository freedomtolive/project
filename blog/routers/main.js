//首页模块
var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
	res.render('main/index.html') //如果路由匹配到/则让页面渲染views下的main下面的index.html
})

//将路由返回出去
module.exports = router