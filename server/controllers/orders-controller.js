var mongoose = require('mongoose');
var Order = require('../datasets/orders');

module.exports.addOrder = function(req, res) {
    var order = new Order(req.body);
    Order.findOne({ _id: req.body.id }, function(err, order) {
        if(err){

        }else{
            res.json({message:'Успішно створено'});
        }
    })
    order.save();

}
module.exports.getCurrentOrder = function(req, res) {

    Order.findOne({ table: req.body.tableId, isNow: true }, function(err, order) {
        if (err) {
            console.log("errr", err);

        } else {

            res.json(order);
        }
    });
}

module.exports.updateOrder = function(req, res) {
    console.log(req.body.id);
    Order.findOne({ _id: req.body.id }, function(err, order) {
        order.items = req.body.items;
        order.totalPrice=req.body.totalPrice;
        order.isNow=req.body.isNow;
        order.isCancel=req.body.isCancel;
        order.comment=req.body.comment;
        order.save(function(err) {
            if (err) throw err;
            res.json({message:'Успішно оновлено'});

        })
    })
}
