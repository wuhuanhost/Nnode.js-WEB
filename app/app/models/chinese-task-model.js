var mongoose = require('mongoose');

var ChineseTaskSchema = require('../schemas/chinese-task-schema');

var ChineseTaskModel = mongoose.model('chinesetasks', ChineseTaskSchema);

module.exports = ChineseTaskModel;
