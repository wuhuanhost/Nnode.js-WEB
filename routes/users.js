var express = require('express');
var router = express.Router();



router.get("/users", function(req, res, err) {
    console.log(__dirname)
    res.json({ data: "hello,Express!!!" });
});


module.exports=router;