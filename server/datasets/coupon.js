var mongoose = require('mongoose');
module.exports = mongoose.model('Coupon', {
    code: String,
    sale:Number
});
