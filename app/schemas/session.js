var mongoose=require('mongoose');


var SessionSchema=new mongoose.Schema({
    session:{
        cookie:{
            originalMaxAge:Number,
            expires:Date,
            httpOnly:Boolean,
            path:String
        },
        userName:String,
        userPwd:String  
    },
    _id:String,
    express:String,
});



SessionSchema.statics.getSession=function(_id,cb){
    
    return this.find({_id:_id},{session:1,_id:0}).limit(1).exec(cb);

};

module.exports=SessionSchema;



