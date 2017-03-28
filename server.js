var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var async = require('async');
var morgan = require('morgan');
var jwt = require("jsonwebtoken");
var config = require("./server/config");


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})



var authController = require('./server/controllers/auth-controller');
var userController = require('./server/controllers/user-controller');
var ingredientController = require('./server/controllers/ingredient-controller');
var providerController = require('./server/controllers/provider-controller');
var supplyController = require('./server/controllers/supply-controller')

//connect to local database
mongoose.connect(config.database);
app.set('superSecret', config.secret);
mongoose.Promise = require('bluebird');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

//static dir
app.use('/bower_components', express.static(__dirname + "/bower_components"));
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads', express.static(__dirname + "/uploads"));

//--------------------
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//api
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });

});

var upload = multer({ storage: storage }).single('file');

app.post('/api/upload', function(req, res) {
    upload(req, res, function(err) {

        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null, filename: req.file.filename });
    })
});


function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}


app.get('/api', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

app.post('/api/menu/ingridients', ingredientController.saveIngredient);
app.post('/api/ingredient/update', ingredientController.updateIngredient);
app.get('/api/menu/get_ingridients', ingredientController.getIngredients);
app.post('/api/menu/getingredient', ingredientController.getIngredient);

app.get('/api/provider', providerController.getProviders);
app.post('/api/provider', providerController.saveProvider);
app.delete('/api/provider/:id', providerController.deleteProvider);

app.get('/api/supply', supplyController.getSupplys);
app.post('/api/supply', supplyController.saveSupply);


app.post('/api/authenticate', userController.auth);
app.post('/api/signin',userController.signin);
app.get('/api/me', ensureAuthorized, userController.me);



process.on('uncaughtException', function(err) {
    console.log(err);
});

//listen server on port 3000
app.listen('3000', function() {
    console.log("this is working")
});
