var mongoose=require('mongoose');
module.exports = mongoose.model('Ingredient',{
	name:String,
	measuringUnit:String,
	writeOff:Boolean,
	
});