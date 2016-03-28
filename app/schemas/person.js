var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sex: String
});

PersonSchema.statics={
    findByName:function(cb){
        console.log(">>>>>>>>>>>>>>>>>>>>>>>")
       return this.find({}).exec(cb);       
    }
}

module.exports=PersonSchema;