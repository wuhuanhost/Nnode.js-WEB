var log4js = require('log4js');
var log4jsConf = require('../../conf/log4js.json');
log4js.configure(log4jsConf);

var logFile=log4js.getLogger("log_file");//日志文件
var logDate=log4js.getLogger("log_date");//每天输出一个文件
var logConsole=log4js.getLogger("console");//输出到控制台

module.exports = logConsole;//