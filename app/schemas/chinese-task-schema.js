var mongoose = require('mongoose');
var log = require('../utils/log4js');
var ChineseTaskSchema = new mongoose.Schema({
    //用户账号
    userName: { type: String, unique: true },
    //记录创建时间
    createTime: { type: Date, default: Date.now },
    chinese: [{
        /**
         * [单价]
         * 存在数据库的金额默认【乘以100】这样就能保证没有小数，显示的时候除以100显示
         */
        price: { type: Number, default: '0.00' },
        //要制作的汉字
        chinese: String,
        /**
         * [制作完成状态]
         * 0：未完成
         * 1：已完成
         */
        completeState: { type: Number, default: 0 },
        //完成时间限制
        lastCompleteDate: Date,
        //制作完成时间
        completeDate: { type: Date, default: Date.now },
        /**
         * [审核状态]
         * 0：暂未审核
         * 1：审核失败
         * 2：审核通过
         */
        checkState: { type: Number, default: 0 },
        //审核时间
        checkTime: { type: Date,default: Date.now },
        //审核备注
        checkRemark: { type: String, default: '' },
    }],
    /**
     * [佣金]
     * 每次后台审核通过之后就会修改此字段的值
     */
    brokerage: { type: Number, default: 0 }
});


ChineseTaskSchema.statics = {
    /**
     * [查询所有的]
     * @param  {[type]}   err [description]
     * @param  {Function} cb  [description]
     * @return {[type]}       [description]
     */
    findAll: function(cb) {
        return this
        .find({})
        .sort('chinese.checkTime')
        .exec(cb);
    },
    /**
     * [根据用户名查询]
     * @param  {[type]}   name [description]
     * @param  {[type]}   err  [description]
     * @param  {Function} cb   [description]
     * @return {[type]}        [description]
     */
    findByName: function(name, cb) {
    	log.info("++++++++++++++++++++++++++++++++++++++");
    	log.info("查询任务的方法");
    	log.info("++++++++++++++++++++++++++++++++++++++");
        return this.findOne({ userName: name }).exec(cb);
    }
};












module.exports = ChineseTaskSchema;
