// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
const joi = require('joi')
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())
// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))
// 路由之前封装res.cc 代替res.send 做代码的简化  只需要用户输入错误的消息，和状态
app.use(function (req, res, next) {
  // 默认是失败的情况  err 是错误对象或者 字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})
// 在配置路由之前  解析token 因为回调函数中要用token进行身份认证
const expressJWT=require('express-jwt')
const config=require('./config')
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// write your code here...
// app.get('/a',(req,res)=>{
// res.send('ok')
// })
// 全局错误级别中间件 在路由之后
app.use(function (err, req,res, next) {
  if (err instanceof joi.ValidationError) {
    return res.cc(err)
  }
  // 身份认证失败的
  if(err.name='UnauthorizedError'){
     return res.cc('身份认证失败')
  }
  // 未知错误
  res.cc(err)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})
