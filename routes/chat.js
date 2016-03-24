/*!
 * @author wuhuan
 * @version [1.0.0]
 * @date [2016-03-24]
 */

var express  = require("express");
var router   = express.Router();
var socketIo = require("socket.io");


router.get("/", function(req, res, err) {
	console.log(__dirname)
    res.sendfile('/books/public/chat.html');

});


router.startSocke = function(server) {
    var io = socketIo.listen(server);
    io.on("connection", function(socket) {
        console.log("socketIo  连接成功......");
        socket.emit("news", { data: "hello world!!!" })
        socket.on("my other event", function(data) {
            console.log(data);
        })
    });

}


module.exports = router;
