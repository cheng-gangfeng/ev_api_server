// 获取用户基本信息的处理函数
const db = require('../db/index')
const bcrypt = require('bcryptjs')
const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?'
exports.getUserInfo = (req, res) => {
    // 配置好解析token的express.jwt中间件，自动req上挂载 user.id 固定写法
    db.query(sql, req.user.id, (err, results) => {
        if (err) { return res.cc(err) }
        if (results.length !== 1) {
            return res.cc('获取用户信息失败！')
        }
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            // 根据id查询用户信息就只有一条
            data: results[0]
        })
    })

}
// 更新用户基本信息的处理函数  根据用户传入的 token中的id
exports.updateUserInfo = (req, res) => {

    const sql = 'update ev_users set ? where id=?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) { return res.cc(err) }
        // 更新语句执行结果是对象
        // console.log(results);
        if (results.affectedRows !== 1) {
            return res.cc('更新用户信息失败！')
        }
        res.cc('更新用户信息成功', 0)
    })

}
// 重置密码的回调函数
exports.updatePassword = (req, res) => {
    // 根据id查询用户信息 是否存在
    const sql = 'select * from ev_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) {
            return res.cc('用户不存在！')
        }

        // console.log(results);
        // 判断输入的旧密码是否正确 之后才能更新密码
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('原密码错误！')
        // 走到这里更新密码
        const sql = 'update ev_users set password=? where id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if (err) { return res.cc(err) }

            if (results.affectedRows !== 1) {
                return res.cc('更新密码失败！')
            }
            res.cc('更新密码成功', 0)
        })

    })

}
// 更新用户头像的处理函数
exports.updateAvatar=(req,res)=>{
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) { return res.cc(err) }
        // 更新语句执行结果是对象
        // console.log(results);
        if (results.affectedRows !== 1) {
            return res.cc('更新用户头像失败！')
        }
        res.cc('更新用户头像成功', 0)
    })
}