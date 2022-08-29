const express =require('express')
const router=express.Router()
const userinfo_handler=require('../router_handler/userinfo')
// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
// 2，导入需要的验证对象
const {update_userinfo_schema,update_password_schema,update_avatar_schema} = require('../schema/user')
// 写接口  操作数据库的在回调函数中 获取用户信息
router.get('/userinfo',userinfo_handler.getUserInfo)
// 更新用户信息
router.post('/userinfo',expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo)
// 重置密码
router.post('/updatepwd',expressJoi(update_password_schema),userinfo_handler.updatePassword)
// 更新用户头像接口 验证是在处理之前 
router.post('/update/avatar',expressJoi(update_avatar_schema),userinfo_handler.updateAvatar)
module.exports=router