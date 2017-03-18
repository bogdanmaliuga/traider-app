var mongoose=require('mongoose');
module.exports = mongoose.model('Supply',{
	provider:Object,
	date:Date,
	comment:String,
	ingredients:Array,
	summary:Number

});