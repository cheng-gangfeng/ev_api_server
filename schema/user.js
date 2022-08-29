// 定义验证规则模块
// 导入 包
const joi = require('joi');
// 定义验证规则
const username=joi.string().alphanum().min(1).max(10).required()
const password=joi.string().pattern(/^[\S]{6,12}$/).required()
// 更新用户基本信息       创建验证规则对象
const id=joi.number().integer().min(1).required()
const nickname=joi.string().required()
const email=joi.string().email().required()
// 导出规则对象 给那个中间件使用
exports.reg_login_schema={
    body:{
        username,password
    }
}

//验证规则对象 更新用户基本信息

exports.update_userinfo_schema={
    // 需要对req.body里面的数据进行验证
    body:{
        id,
        nickname,
        email
    }
}
// 密码的验证

exports.update_password_schema={
    // 需要对req.body里面的数据进行验证 前端传过来的
    body:{
      oldPwd:password,
      newPwd:joi.not(joi.ref('oldPwd')).concat(password)
    }
}
// 验证用户头像  导出验证规则对象
const avatar=joi.string().dataUri().required()
exports.update_avatar_schema={
    body:{
        avatar
    }
}
