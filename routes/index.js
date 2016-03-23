var express = require('express');
var router = express.Router();
var dbinfo = require('../app/utils/db');
var mongoose = require('mongoose');
var person = require('../app/models/person');
var MD5 = require('md5');
var _ = require('underscore');
var log=require('../app/utils/log4js');





log.info("日志管理添加成功............");
log.trace('This is a Log4js-Test');
log.debug('We Write Logs with log4js');
log.info('You can find logs-files in the log-dir');
log.warn('log-dir is a configuration-item in the log4js.json');
log.error('In This Test log-dir is : \'./logs/log_test/\'');
log.info("日志管理添加成功............");



mongoose.connect(dbinfo.getUrl());
mongoose.set("debug", true); //mongoose调试模式


/* GET home page. */
router.get('/login', function(req, res, next) {

    var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) {
        return num % 2 == 0; });
    console.log(evens);

    console.log(dbinfo.getUrl());

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(req.session);
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<")


    if (req.session.user != null) {
        console.log("mongoDB中的session存在......")
    } else {
        var user = {
            userName: 'liming',
            userPwd: MD5('123456')
        };
        req.session.user = user;
    }

    // person.findByName(function(err,data){
    //     console.log("=================================")
    //     console.log(data);

    // });

    res.render('index', { title: 'Express' });


});



module.exports = router;
