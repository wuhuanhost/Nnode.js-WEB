/**
 * 管理mongoose的工具类
 * @type {[type]}
 */
var dbconf = require('../../conf/db.json');
var mongoose = require('mongoose');
var DB = (function() {
    var mongoDB = {
        userName: dbconf.userName,
        userPwd: dbconf.userPwd,
        db: dbconf.db,
        url: dbconf.url,
        ip: dbconf.ip,
        port: dbconf.port,
        getUrl: function() {
            return this.url + this.ip + ":" + this.port + "/" + this.db;
        }
    }
    return mongoDB;
}());


//获取mongoose连接
mongoose.getConeection = function() {
    return mongoose.createConnection(DB.getUrl());
}


try {
    mongoose.connect(DB.getUrl());
    mongoose.set("debug", true); //mongoose调试模式
} catch (err) {
    console.log("mongoDB数据库连接异常......");
}


module.exports = mongoose;
