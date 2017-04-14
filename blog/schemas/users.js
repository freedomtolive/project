//结构文件：定义结构
var mongoose = require('mongoose')

//定义用户的表结构
module.exports = new mongoose.Schema({
	//用户名
	name:String,
	//密码
	passward:String,

})