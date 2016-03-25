var dbinfo = require('../utils/db');
var log = require('../utils/log4js');
var mongoose = require('mongoose');
var person = require('../models/person');
var MD5 = require('md5');
var _ = require('lodash');

/**
 * 用户登录的方法
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
mongoose.connect(dbinfo.getUrl());
mongoose.set("debug", true); //mongoose调试模式

/**
 * 登录
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.logIn = function(req, res) {
    console.log(_.pull([1, 2, 3, 4], 4))
    if (req.session.user != null) {
        log.info("mongoDB中的session存在......")
        res.render("index", { data: req.session.user.userName })
    } else {
        if (req.body.userName === "root" && req.body.userPwd === "123456") { //用户名密码正确
            var user = {
                userName: 'root',
                userPwd: MD5('123456')
            };
            req.session.user = user;
            res.redirect("/admin");
        } else {
            //用户名密码错误
            if (req.body.userName != "" && req.body.userPwd != "") {
                console.log("用户名密码错误");
                res.render("login", { data: "用户名密码错误" });
            } else {
                res.render("login", { data: "用户名密码不能为空" });
            }
        }
    }
};


/**
 * 根据用户名查找单个用户
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.user = function(req, res) {
    log.info(">>>>>>>>>>" + req.query.userAccount);
    res.json({ data: req.params.userAccount })
};

/**
 * 用户退出的方法
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
exports.logOut = function(req, res) {



};


/**
 * 用户注册
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.singIn = function(req, res) {



};

/**
 * 显示所用的用户
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.users = function(req, res) {



};
