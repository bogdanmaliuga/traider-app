var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var mongoose = require('mongoose');
var multer = require('multer');
var async = require('async');
var morgan = require('morgan');
var jwt = require("jsonwebtoken");
var config = require("./server/config");

var users=require('./server/datasets/users');


//controllers
var userController = require('./server/controllers/user-controller');
var ingredientController = require('./server/controllers/ingredient-controller');
var providerController = require('./server/controllers/provider-controller');
var supplyController = require('./server/controllers/supply-controller');
var ordersController = require('./server/controllers/orders-controller');
var productController = require('./server/controllers/product-controller');

//connect to local database
mongoose.connect(config.database);
mongoose.Promise = require('bluebird');

//set secret for auth
app.set('superSecret', config.secret);

//body-parser 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

//static dirs
app.use('/bower_components', express.static(__dirname + "/bower_components"));
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads', express.static(__dirname + "/uploads"));

//cors
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//express-jwt.Need secter to all pages unless
app.use(expressJwt({ secret: app.get('superSecret') }).unless({ path: ['/','/signup','/login','/home']}));

//apis
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

app.get('/api', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

app.post('/signup',userController.signup);
app.post('/login',userController.login,function(req,res){
    var token = jwt.sign({username: req.body.username}, app.get('superSecret'));
    res.status(200).send({token: token,username: req.body.username});
});


app.post('/api/upload', ingredientController.upload);
app.post('/api/menu/ingridients', ingredientController.saveIngredient);
app.post('/api/ingredient/update', ingredientController.updateIngredient);
app.get('/api/menu/get_ingridients', ingredientController.getIngredients);
app.post('/api/menu/getingredient', ingredientController.getIngredient);

app.get('/api/provider', providerController.getProviders);
app.post('/api/provider', providerController.saveProvider);
app.delete('/api/provider/:id', providerController.deleteProvider);

app.get('/api/supply', supplyController.getSupplys);
app.post('/api/supply', supplyController.saveSupply);

app.post('/api/order',ordersController.addOrder);
app.post('/api/getorder',ordersController.getCurrentOrder);
app.post('/api/update_order',ordersController.updateOrder);

app.post('/api/menu/product',productController.saveProduct)


//listen server on port 3000
app.listen('8080', function() {
    console.log("this is working")
});
