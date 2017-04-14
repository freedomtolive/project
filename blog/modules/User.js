//模型文件：定义模型
var mongoose = require('mongoose')

var usersSchema = require('../schemas/users')

moudle.exports = mongoose.moudle('User',usersSchema)