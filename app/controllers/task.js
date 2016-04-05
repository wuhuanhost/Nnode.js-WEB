var mongoose = require('../utils/db');
var log = require('../utils/log4js');
var ChineseTaskModel = require('../models/chinese-task-model');
//分配汉字任务
exports.addChineseTask = function(req, res) {
    var userName = req.params.userName;
    var task = new ChineseTaskModel({
        userName: userName,
        chinese: [{
            price: 1.20 * 100,
            //要制作的汉字
            chinese: '山',
        }, {
            price: 1.20 * 100,
            //要制作的汉字
            chinese: '中',
        }, {
            price: 1.20 * 100,
            //要制作的汉字
            chinese: '访',
        }, {
            price: 1.20 * 100,
            //要制作的汉字
            chinese: '友',
        }]
    });
    task.save(function(err) {
        if (err) {
            log.error(err.errmsg);
            res.json({ code: 0, msg: '任务分配失败', success: false });
        } else {
            log.info("任务分配成功");
            res.json({ code: 1, msg: '任务分配成功', success: true });
        }
    });
};
/**
 * [根据用户名称查询用户的任务]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.tasklist = function(req, res) {
    var userName = req.params.userName;
    ChineseTaskModel.findByName(userName,function(err, task) {
        if (err) {
            res.json({ data: 'faild' });
        } else {
            res.json({ data: task });
        }
    })
}
