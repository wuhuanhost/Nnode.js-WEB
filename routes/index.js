var express = require('express');
var router = express.Router();



var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:12345/db');
var　person=require('../models/person')


/* GET home page. */
router.get('/home', function(req, res, next) {
    
    

    
    person.findByName(function(err,data){
        console.log("=================================")
        console.log(data);
        
        
    });
   
  res.render('index', { title: 'Express' });
  
  
});




module.exports = router;



