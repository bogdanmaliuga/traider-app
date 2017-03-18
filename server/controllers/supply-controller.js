var mongoose = require('mongoose');
var Supply = require('../datasets/supply');
var Ingredient = require('../datasets/ingredients');
var async = require('async');
module.exports.getSupplys = function(req, res) {
    Supply.find(function(err, supplys) {
        if (err)
            res.send(err);

        res.json(supplys);
    });

}
module.exports.saveSupply = function(req, res) {
    var supply = new Supply(req.body);

    async.each(req.body.ingredients,function(i,callback) {
    	
    	Ingredient.findOne({_id:i.ingredient._id},function(err,ing) {
    		
    		ing.price=i.ingredient.price;
    		ing.lastPrice=i.ingredient.lastPrice;
    		ing.count=i.ingredient.count;
    		ing.is_used=i.ingredient.is_used;
    		
    		ing.save(function (err) {
    			if(err) throw err;
    			
    		})
    	})

    });
    supply.save();
    res.send("Поставку додано");


}
