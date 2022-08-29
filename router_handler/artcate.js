const db = require('../db/index')
// 获取文章分类列表
exports.getArtcateCate = (req, res) => {
    //    res.send('ok')
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        if (err) { return res.cc(err) }
        res.send({
            status: 0,
            message: '获取文章分类列表成功',
            data: results
        })
    })
}
// 添加文章分类
exports.addArticleCates = (req, res) => {
    //    res.send('ok')
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) {
            res.cc(err)
        }
        if (results.length === 2) return res.cc('分类名称和别名都被占用，请更换')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称和别名都被占用，请更换')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换')
        const sql = 'insert into ev_article_cate set ?'
        // 执行sql语句
        db.query(sql, req.body, (err, results) => {
            if (err) {
                // return res.send({stauts:1,message:err.message})
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {

                return res.cc('新增文章失败')

            }

            return res.cc('新增文章分类成功', 0)

        })
    })
}
// 删除文章分类
exports.deleCateById = (req, res) => {
    //    res.send('ok')
    const sql = 'update ev_article_cate set is_delete=1 where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) { return res.cc(err) }
        // 更新语句执行结果是对象
        // console.log(results);
        if (results.affectedRows !== 1) {
            return res.cc('删除文章分类失败！')
        }
        res.cc('删除文章分类成功', 0)
    })
}


exports.getArtCateById = (req, res) => {
    //    res.send('ok')
    const sql = 'select * from ev_article_cate where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) { return res.cc(err) }
        if (results.length !== 1) {
            return res.cc('获取文章分类失败！')
        }
        res.send({
            status: 0,
            message: '获取文章分类成功！',
            // 根据id查询用户信息就只有一条
            data: results[0]
        })
    })
}
exports.updateCateById = (req, res) => {
    //    res.send('ok')
    const sql = 'select * from ev_article_cate where Id<>? and (name=? or alias=?) '
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        if (err) {
            res.cc(err)
        }
        if (results.length === 2) return res.cc('分类名称和别名都被占用，请更换')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称和别名都被占用，请更换')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换')
        const sql = 'update ev_article_cate set ? where id=?'
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            if (err) { return res.cc(err) }
            // 更新语句执行结果是对象
            // console.log(results);
            if (results.affectedRows !== 1) {
                return res.cc('更新文章分类失败！')
            }
            res.cc('更新文章分类成功', 0)
        })

    })

}