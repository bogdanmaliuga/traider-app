var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var app = express();
var authController=require('./server/controllers/auth-controller');
var userController=require('./server/controllers/user-controller');
var ingredientController= require('./server/controllers/ingredient-controller')

//connect to local database
mongoose.connect('mongodb://localhost:27017/traider');
app.use(bodyParser.json());
//static dir
app.use('/bower_components', express.static(__dirname + "/bower_components"));
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));


//api
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });

});

app.post('/api/user/signup',authController.signup);
app.get('/api/userList',userController.getUsers);
app.post('/api/menu/ingridients',ingredientController.saveIngredient);
app.get('/api/menu/get_ingridients',ingredientController.getIngredients);


//listen server on port 3000
app.listen('3000', function() {
    console.log("this is working")
});
