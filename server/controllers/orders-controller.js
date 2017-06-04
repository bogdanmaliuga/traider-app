var mongoose = require('mongoose');
var Order = require('../datasets/orders');
var Ingredient = require('../datasets/ingredients');
var async = require('async');

module.exports.addOrder = function(req, res) {
  var order = new Order(req.body);
  Order.findOne({
    _id: req.body.id
  }, function(err, order) {
    if (err) {

    } else {
      res.json({
        message: 'Успішно створено'
      });
    }
  })
  order.save();

}
module.exports.getCurrentOrder = function(req, res) {

  Order.findOne({
    table: req.body.tableId,
    isNow: true
  }, function(err, order) {
    if (err) {
      console.log("errr", err);

    } else {

      res.json(order);
    }
  });
}

module.exports.updateOrder = function(req, res) {

  Order.findOne({
    _id: req.body.id
  }, function(err, order) {

    if (!req.body.isNow) {
      async.each(order.items, function(i, callback) {

        async.each(i.ingredients, function(item, callback) {

          Ingredient.findOne({
            _id: item.ingredient._id
          }, function(err, ing) {
            console.log(ing.count);
            ing.count = ing.count - (i.countForBuy * item.netto);
            console.log(ing.count);
            ing.save(function(err) {
              if (err) throw err;
            })
          })
        })
      });
    }

    order.items = req.body.items;
    order.totalPrice = req.body.totalPrice;
    order.isNow = req.body.isNow;
    order.isCancel = req.body.isCancel;
    order.comment = req.body.comment;
    order.sale = req.body.sale;
    order.save(function(err) {
      if (err) throw err;
      res.json({
        message: 'Успішно оновлено'
      });

    })
  })
}
