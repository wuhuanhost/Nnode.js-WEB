var mongoose = require('mongoose');
var log = require('../utils/log4js')
var UserSchema = new mongoose.Schema({
    userName: { type: String, unique: true }, //用户名唯一
    userPwd: String, //密码
    userNickName: String, //昵称，别名
    email:{type:String,default:''},
    createTime: { type: Date, default: Date.now }, //创建时间
    /**
     * [用户状态]
     * 0： 正常
     * 1： 暂停
     * 2： 停用
     */
    userState: Number,
    token: String, //token
    /**
     * [用户角色]
     * 000-99： 超级管理员
     * 100-199： 系统管理员
     * 200-299： 用户
     */
    role: { type: Number, default: 200 },
    lastLoginTime: { type: Date, default: Date.now }, //最近一次登录时间
    lastLoginIp: { type: String, default: '' } //最近一次登录ip
})



UserSchema.pre('save', function(next) {
    log.info("save方法执行前执行的任务");
    next();
})


UserSchema.save = function(err,cb) {
    if (err) {
        log.info("保存失败" + err);
        exec(cb)
    } else {
        log.info("保存成功");
    }
}

UserSchema.static = {
    findByName: function(name, cb) {
        return this.findOne({ 'userName': name }).exec(cb);
    }
};

module.exports = UserSchema;
