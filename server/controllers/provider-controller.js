var mongoose = require('mongoose');
var Provider = require('../datasets/provider');
module.exports.getProviders = function(req, res) {
    Provider.find(function(err, providers) {
        if (err)
            res.send(err);

        res.json(providers);
    });

}
module.exports.saveProvider = function(req, res) {
    var provider = new Provider(req.body);

    provider.save();
    res.send("Постачальника додано");
}
module.exports.deleteProvider = function(req, res) {

    Provider.remove({
        _id: req.params.id
    }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({ message: 'Постачальника видалено' });
    });
}
