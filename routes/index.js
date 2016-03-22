var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:12345/db');

var person = require('../app/models/person');

var Sessions = require('../app/models/session');

var MD5 = require('md5');

mongoose.set("debug", true);//mongoose调试模式


/* GET home page. */
    router.get('/login', function(req, res, next) {

    Sessions.getSession(req.sessionID, function(err, data) {
        if (err)
            console.log(err);
        var abc=JSON.stringify(data[0].session);    
        console.log(JSON.parse(abc));
        // console.log(data[0].session.userName);

    })
        
    req.session.userName = 'liming';
    req.session.userPwd=MD5('123456');
    
    // person.findByName(function(err,data){
    //     console.log("=================================")
    //     console.log(data);

    // });

    res.render('index', { title: 'Express' });


});



module.exports = router;



