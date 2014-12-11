var express = require('express'),
  session = require('express-session'),
  routes = require('./routes/slash'),
  recipes = require('./routes/recipes'),
	data = require('./models/database'),
	path = require('path');

var fs = require("fs");
var app = express();

 var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.configure(function(){
  app.set('views', __dirname + '/views'); // Set the directory for views
  app.set('view engine', 'ejs');  // Set the view engine to EJS
  app.use(express.logger('tiny'));	// Log requests to the console.log
  app.use(express.bodyParser());	// Parse the request body into req.body object
  app.use(express.methodOverride()); // Allows you to override HTTP methods on old browsers
  app.use(app.router); // Do the routes defined below
  app.use(express.static(__dirname + '/public'));	// Process static files
});

// index page
app.get('/', routes.pathless);
app.post('/recipes',recipes.newRecipe);
app.get('/recipes/list',recipes.listRecipes);

app.listen(44445);
console.log("Express server running on port 44445");