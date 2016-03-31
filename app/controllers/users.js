var dbinfo = require('../utils/db');
var log = require('../utils/log4js');
var mongoose = require('mongoose');
var person = require('../models/person');
var UserModel = require('../models/user-model');
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
    if (req.body.data != null && req.body.data != "undefined") {
        req.body.userName = req.body.data.userName;
        req.body.userPwd = req.body.data.userPwd;
    }

    if (req.session.user != null) {
        log.info("mongoDB中的session存在......")
        res.json({ data: req.session.user.userName, success: true })
    } else {
        if (req.body.userName === "liming" && req.body.userPwd === "123456") { //用户名密码正确
            var user = {
                userName: 'liming',
                userPwd: MD5('123456')
            };
            req.session.user = user;
            res.json({ data: "登录成功", success: true });
        } else {
            //用户名密码错误
            if (req.body.userName != "" && req.body.userPwd != "") {
                console.log("用户名密码错误");
                res.json({ data: "用户名密码错误", success: false });
            } else {
                res.json({ data: "用户名密码不能为空", success: false });
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
exports.getUserInfoByName = function(req, res) {
    log.info(">>>>>>>>>>获取用户信息" + req.params.userName);
    if (req.session.user == null) {
        log.info("mongoDB中的session存在......")
        res.json("index", { data: req.session.user.userName, success: false })
    } else {
        UserModel.findByName(req.params.userName, function(err, data) {
            if (err) {
                log.error(err);
            } else {
                res.json({ data: data, success: true });
            }
        });
    }
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

/**
 * [创建用户]
 * @param {[type]} req [description]
 * @param {[type]} res [description]
 */
exports.addUser = function(req, res) {
    var userName = req.params.userName; //角色编号
    var users = new UserModel({
        "userName": userName,
        "userPwd": '123456789',
        "nickName": '李明',
        "userState": 0,
        "token": '',
        "phone": "13892656369"
    });
    users.save(function(err) {
        if (err) {
            log.info(err.errmsg);
            res.json({ code: 0, msg: '用户添加失败', success: false });
        } else {
            res.json({ code: 1, msg: '用户添加成功', success: true });
        }
    });
};
