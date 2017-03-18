var mongoose=require('mongoose');
module.exports = mongoose.model('Ingredient',{
	name:String,
	measuringUnit:String,
	img:String,
	price:Array,
	lastPrice:Number,
	count:Number,
	is_used:Boolean
	
});