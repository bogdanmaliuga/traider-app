var mongoose = require('mongoose');
var Ingredient = require('../datasets/ingredients');
module.exports.saveIngredient = function(req, res) {
    var ingredient = new Ingredient(req.body);
    ingredient.save();

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
