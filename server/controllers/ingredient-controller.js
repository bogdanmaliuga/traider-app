var mongoose = require('mongoose');
var Ingredient = require('../datasets/ingredients');
module.exports.saveIngredient= function(req, res) {
	var ingredient=new Ingredient(req.body);
	ingredient.save();
	
}
module.exports.getIngredients=function(req,res){
	Ingredient.find(function(err, ingredient) {
            if (err)
                res.send(err);

            res.json(ingredient);
        });
}
