var dbconf = require('../../conf/db.json');
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

module.exports = DB;
