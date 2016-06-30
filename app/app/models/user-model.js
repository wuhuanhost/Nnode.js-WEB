var mongoose=require('mongoose');
var UserSchema=require('../schemas/user-schema');
var UserModel=mongoose.model('users',UserSchema);
module.exports=UserModel;