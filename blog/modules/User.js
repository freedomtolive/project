//模型文件：定义模型
var mongoose = require('mongoose')

var usersSchema = require('../schemas/user')

module.exports = mongoose.model('User',usersSchema)