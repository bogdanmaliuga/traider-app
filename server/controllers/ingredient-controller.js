var mongoose = require('mongoose');
var Ingredient = require('../datasets/ingredients');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

var upload = multer({ storage: storage }).single('file');




module.exports.saveIngredient = function(req, res) {
    var ingredient = new Ingredient(req.body);
    ingredient.save();

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

module.exports.upload = function(req, res) {
    upload(req, res, function(err) {

        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null, filename: req.file.filename });
    });
}
