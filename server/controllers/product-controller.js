var mongoose = require('mongoose');
var Product = require('../datasets/product');
var Сlassifier = require('../datasets/classifier');


module.exports.saveProduct = function(req, res) {
    console.log(req.body);
    var product = new Product(req.body);
    product.save();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    res.end();

}
module.exports.saveClass= function(req, res) {
    
    var classefier = new Сlassifier(req.body);
    classefier.save();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    res.end();

}
module.exports.getClass= function(req, res) {
    Сlassifier.find(function(err, clas) {
        if (err)
            res.send(err);

        res.json(clas);
    });
}
module.exports.deleteClass= function(req, res) {

    Сlassifier.remove({
        _id: req.params.id
    }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({ message: 'Класифікатор видалено' });
    });
}

module.exports.updateProduct= function(req, res) {
    console.log(req.body);

    Product.findById(req.body.id, function(err, product) {
        if (err) throw err;


        product.lastPrice = req.body.lastPrice;
        


        product.save(function(err) {
            if (err) throw err;


        });

    });


}

module.exports.getProducts= function(req, res) {
    Product.find(function(err, product) {
        if (err)
            res.send(err);

        res.json(product);
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

