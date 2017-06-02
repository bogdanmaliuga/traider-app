var mongoose = require('mongoose');
var Coupon = require('../datasets/coupon');

module.exports.saveCoupon = function(req, res) {
  
    var coupon = new Coupon(req.body);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    res.end();
    coupon.save();

}
module.exports.getCoupon = function(req, res) {

    Coupon.findOne({ code: req.params.code }, function(err, coupon) {
        if (err) {
            console.log("errr", err);

        } else {

            res.json(coupon);
        }
    });
}
module.exports.getCoupons = function(req, res) {

    Coupon.find(function(err, coupon) {
        if (err)
            res.send(err);

        res.json(coupon);
    });
}
