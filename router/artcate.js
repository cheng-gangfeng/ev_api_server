// 文章分类路由模块
const express =require('express')
const router=express.Router()
const artcate_handler = require('../router_handler/artcate');
const expressJoi = require('@escook/express-joi');
const {add_cate_schema,delete_cate_schema,get_cate_schema,updqte_cate_schema} = require('../schema/artcate')
// 获取文章分类的列表数据
router.get('/cates',artcate_handler.getArtcateCate)
// 新增文章分类的接口
router.post('/addcates',expressJoi(add_cate_schema),artcate_handler.addArticleCates)
// 根据id删除文章分类  动态的
router.get('/deletecate/:id',expressJoi(delete_cate_schema),artcate_handler.deleCateById)
// 根据id 获取文章分类数据
router.get('/cates/:id',expressJoi(get_cate_schema),artcate_handler.getArtCateById)
// 根据id 更新文章分类数据 
router.get('/updatecate',expressJoi(updqte_cate_schema),artcate_handler.updateCateById)

module.exports=router