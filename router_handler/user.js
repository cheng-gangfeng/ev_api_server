// 路由处理函数模块
const db = require('../db/index')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const config=require('../config')
// 注册用户的处理函数
exports.regUser = (req, res) => {
  // 获取客户端提交到服务器的用户信息
  const userinfo = req.body
  // console.log(userinfo);
  //对表单数据进行校验 是否合法
  // if(!userinfo.username||!userinfo.password){
  //   // return res.send({status:1,message:'用户名或密码不合法'})
  //   return res.cc('用户名或密码不合法')

  // }
  //在回调函数中写 sql 操作数据库
  // 定义SQL语句 查询用户名是否被占用
  const sqlStr = 'select * from ev_users where username=?'
  // 执行SQL语句
  db.query(sqlStr, userinfo.username, (err, results) => {
    // 执行SQL语句失败

    if (err) {
      // return res.send({status:1,message:err.message})
      return res.cc(err)

    }
    // 执行SQL语句成功
    // 判断用户名是否被占用
    if (results.length > 0) {
      // return res.send({status:0,message:'用户名被占用，请更换其他用户名'})
      return res.cc('用户名被占用，请更换其他用户名')
    }
    // 用户名没有重复
    // 对密码进行加密
    // console.log(userinfo);
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    //  console.log(userinfo);
    // 定义插入新用户的SQL语句
    const sql = 'insert into ev_users set ?'
    // 执行sql语句
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
      if (err) {
        // return res.send({stauts:1,message:err.message})
        return res.cc(err)
      }
      if (results.affectedRows !== 1) {
        //  return res.send({status:1,message:'注册新用户失败'})
        return res.cc('注册新用户失败')

      }
      // 注册新用户成功
      // res.send({stauts:0,message:'注册成功'})
      return res.cc('注册新用户成功', 0)

    })
  })



}

// 登录的处理函数
exports.login = (req, res) => {
  const userinfo = req.body
  // console.log(userinfo);
  const sql = 'select * from ev_users where username=?'
  db.query(sql, userinfo.username, (err, results) => {
   
    if (err) {
      return res.cc(err)
    }

    if (results.length !== 1) {
      console.log(results);
      return res.cc('登录失败')

    }
    //  查询到了用户信息 接下来对密码进行处理
  
    // 判断用户输入的密码是否和数据库中的密码一致 所以只能判断加密过的  加密啦 bcrypt.compareSync
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
   
    if (!compareResult) {
      return res.cc('登录失败，密码错误')
    }
    // 登陆成功 ，生成token字符串
    // res.send('login OK')
    // 获取到用户的信息 生成秘钥  调用方法加密 响应给客户端
    const user = { ...results[0], password: '',  user_pic:''}
    console.log(user);
    // 生成token字符串
    const tokenStr=  jwt.sign(user,config.jwtSecretKey,{
      expiresIn:config.expiresIn
    })
    console.log(tokenStr);
    // 响应给客户端
    res.send({
      status:1,
      message:'登录成功',
      token: 'Bearer '+tokenStr
    })


  })

}