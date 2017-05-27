var mongoose=require('mongoose');
module.exports = mongoose.model('Product',{
	name:String,
	netto:Number,
	ingredients:Array,
	weight:Number,
	cost:Number,
	imgUrl:String,
	lastPrice:Number

	
});