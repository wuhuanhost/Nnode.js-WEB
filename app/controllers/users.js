var dbinfo = require('../utils/db');
var log = require('../utils/log4js');
var mongoose = require('mongoose');
var person = require('../models/person');
var MD5 = require('md5');
var _ = require('underscore');

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
    if (req.session.user != null) {
        log.info("mongoDB中的session存在......")
    } else {
        var user = {
            userName: 'liming',
            userPwd: MD5('123456')
        };
        req.session.user = user;
    }
    res.json({ data: 'hello，express' })
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
