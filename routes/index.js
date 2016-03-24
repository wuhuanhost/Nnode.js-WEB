'use strict'

var express = require('express');
var router = express.Router();
var dbinfo = require('../app/utils/db');
var mongoose = require('mongoose');
var person = require('../app/models/person');
var MD5 = require('md5');
var _ = require('underscore');
var log = require('../app/utils/log4js');


mongoose.connect(dbinfo.getUrl());
mongoose.set("debug", true); //mongoose调试模式


/* GET home page. */
router.get('/login', function(req, res, next) {

    var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) {
        return num % 2 == 0;
    });
    log.info(evens);

    log.info(dbinfo.getUrl());

    log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    log.info(req.session);
    log.info("<<<<<<<<<<<<<<<<<<<<<<<<<<<")


    if (req.session.user != null) {
        log.info("mongoDB中的session存在......")
    } else {
        var user = {
            userName: 'liming',
            userPwd: MD5('123456')
        };
        req.session.user = user;
    }

    // person.findByName(function(err,data){
    //     log.info("=================================")
    //     log.info(data);

    // });


    res.render('index', { title: 'Express' });


});








module.exports = router;
