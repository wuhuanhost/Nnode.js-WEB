'use strict'

var express = require('express');
var router = express.Router();
var users = require("../app/controllers/users");

/**
 * 用户管理
 */

router.get("/admin", function(req, res, err) {
    if (req.session.user != null) {
        console.info("mongoDB中的session存在......")
        res.render("index", { data: '欢迎你，'+req.session.user.userName })
    } else {
        res.render("logIn", { data: '请登录' })
    }
})

router.get('/admin/singIn', users.singIn); //用户注册
router.post('/admin/logIn', users.logIn); //用户登录
router.get('/admin/logOut', users.logOut); //用户退出
router.get('/admin/users', users.users) //显示所有的用户
router.get('/admin/user/:userAccount', users.user); //根据用户名查询用户

module.exports = router;
