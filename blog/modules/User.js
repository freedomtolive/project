//模型文件：定义模型
var mongoose = require('mongoose')

var usersSchema = require('../schemas/user')

//为数据库创建一个模型，模型的名字叫User，利用的是usersSchema文件；返回值是一个模型类
//先创建一个表结构对象，再根据表结构对象创建一个模型类，后期可以通过操作模型类来操作数据库
module.exports = mongoose.model('User',usersSchema)