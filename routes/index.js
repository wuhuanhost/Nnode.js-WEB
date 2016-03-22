var express = require('express');
var router = express.Router();

var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:12345/db');
var　person=require('../app/models/person')

mongoose.set("debug",true);//mongoose调试模式










/* GET home page. */
router.get('/', function(req, res, next) {
    
    person.findByName(function(err,data){
        console.log("=================================")
        console.log(data);
        
    });
   
  res.render('index', { title: 'Express' });
  
  
});




module.exports = router;



