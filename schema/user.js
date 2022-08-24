// 定义验证规则模块
// 导入 包
const joi = require('joi');
// 定义验证规则
const username=joi.string().alphanum().min(1).max(10).required()
const password=joi.string().pattern(/^[\S]{6,12}$/).required()
// 导出规则对象 给那个中间件使用
exports.reg_login_schema={
    body:{
        username,password
    }
}

