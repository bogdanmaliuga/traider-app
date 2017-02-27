var mongoose = require('mongoose');
var User = require('../datasets/users');
module.exports.getUsers= function(req, res) {
	User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
	
}
