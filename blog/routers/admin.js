var express = require('express');
var router = express.Router();

router.get('/user',function(req,res,next){
	res.send('user')
})

//将路由返回出去
module.exports = router