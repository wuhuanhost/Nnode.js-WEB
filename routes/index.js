'use strict'

var express = require('express');
var router = express.Router();
var users = require("../app/controllers/users");

/**
 * 用户管理
 */
router.get('/admin/singIn',users.singIn);//用户注册
router.get('/admin/logIn', users.logIn);//用户登录
router.get('/admin/logOut',users.logOut);//用户退出
router.get('/admin/users',users.users)//显示所有的用户
router.get('/admin/user/:userAccount',users.user);//根据用户名查询用户

module.exports = router;
