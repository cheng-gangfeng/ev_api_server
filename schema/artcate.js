const joi = require('joi');
const name = joi.string().required()
const alias = joi.string().alphanum().required()
exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

// 删除文章分类的规则对象
const id = joi.number().integer().min(1).required()
exports.delete_cate_schema = {
    params: {
        id
    }
}
// 根据id获取文章分类的规则对象
exports.get_cate_schema = {
    params: {
        id,

    }
}
exports.updqte_cate_schema = {
    body: {
        Id:id,
        name,
        alias
    }
}
