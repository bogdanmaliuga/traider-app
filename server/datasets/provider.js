var mongoose=require('mongoose');
module.exports = mongoose.model('Provider',{
	name:String,
	account:String,
	address:String,
	mfo:String,
	telephone:String,
	ipn:String,
	comment:String

});