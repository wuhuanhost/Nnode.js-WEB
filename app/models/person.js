var mongoose=require('mongoose');

var PersonSchema=require('../schemas/person');


var person=mongoose.model('persons',PersonSchema);


person.findByName({name:'李四'},function(err,person){
    
    
    
    console.log("========================="+person)
    
    
    
})


module.exports=person;