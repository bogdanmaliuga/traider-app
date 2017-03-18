var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var async = require('async');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})


var app = express();
var authController = require('./server/controllers/auth-controller');
var userController = require('./server/controllers/user-controller');
var ingredientController = require('./server/controllers/ingredient-controller');
var providerController=require('./server/controllers/provider-controller');
var supplyController=require('./server/controllers/supply-controller')

//connect to local database
mongoose.connect('mongodb://localhost:27017/traider');
mongoose.Promise = require('bluebird');

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//static dir
app.use('/bower_components', express.static(__dirname + "/bower_components"));
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads', express.static(__dirname + "/uploads"));


//api
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });

});
var upload = multer({ storage: storage}).single('file');

app.post('/api/upload', function(req, res) {
    upload(req, res, function(err) {
    	
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null ,filename:req.file.filename });
    })
});
app.post('/api/user/signup', authController.signup);
app.get('/api/userList', userController.getUsers);
app.post('/api/menu/ingridients', ingredientController.saveIngredient);
app.post('/api/ingredient/update',ingredientController.updateIngredient);
app.get('/api/menu/get_ingridients', ingredientController.getIngredients);
app.post('/api/menu/getingredient', ingredientController.getIngredient);
app.get('/api/provider',providerController.getProviders);
app.post('/api/provider',providerController.saveProvider);
app.delete('/api/provider/:id',providerController.deleteProvider);
app.get('/api/supply',supplyController.getSupplys);
app.post('/api/supply',supplyController.saveSupply);




//listen server on port 3000
app.listen('3000', function() {
    console.log("this is working")
});
