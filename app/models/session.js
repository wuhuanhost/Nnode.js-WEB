var mongoose=require('mongoose');

var SessionSchema=require('../schemas/session');

var Session=mongoose.model('sessions',SessionSchema);

module.exports=Session;