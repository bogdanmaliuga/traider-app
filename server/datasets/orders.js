var mongoose=require('mongoose');
module.exports = mongoose.model('Orders',{
	date:Date,
	items:Array,
	table:Number,
	isNow:Boolean,
	isCancel:false,
	comment:String,
	totalPrice:Number
	
});