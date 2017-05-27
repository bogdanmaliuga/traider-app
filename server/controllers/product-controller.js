var mongoose = require('mongoose');
var Product = require('../datasets/product');


module.exports.saveProduct = function(req, res) {
    console.log(req.body);
    var product = new Product(req.body);
    product.save();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    res.end();

}
module.exports.updateIngredient = function(req, res) {

    Ingredient.findById(req.body._id, function(err, ingredient) {
        if (err) throw err;


        ingredient.name = req.body.name;
        ingredient.measuringUnit = req.body.measuringUnit;


        ingredient.save(function(err) {
            if (err) throw err;


        });

    });


}

module.exports.getIngredients = function(req, res) {
    Ingredient.find(function(err, ingredient) {
        if (err)
            res.send(err);

        res.json(ingredient);
    });
}
module.exports.getIngredient = function(req, res) {

    Ingredient.find({ _id: req.body.id }, function(err, ingredient) {
        if (err) {
            console.log("errr", err);

        } else {
            res.json(ingredient)
        }
    });
}

