const express =require('express')
const router=express.Router()
const article_handler=require('../router_handler/aticle')
const expressJoi = require('@escook/express-joi');
const {add_article_schema} =require('../schema/article')
// 配置解析文件的中间件
const multer = require('multer');
const path = require('path');
const upload=multer({dest:path.join(__dirname,'../uploads')})
// 发布文章的接口
router.post('/add',upload.single('cover_img'),expressJoi(add_article_schema),article_handler.addArticle)
module.exports=router