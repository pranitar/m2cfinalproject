var express = require('express'),
  session = require('express-session'),
  routes = require('./routes/slash'),
  // morgan = require('morgan'),
  recipes = require('./routes/recipes'),
  //ingredients = require('./routes/ingredients'),
	data = require('./models/database').database,
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
// app.get('/recipes', )
app.put('/recipes',recipes.newRecipe);
app.get('/recipes/list',recipes.listRecipes);
// app.post('/recipes/edit/:id',recipes.editRecipe);

app.listen(44445);
console.log("Express server running on port 44445");

// edit team
// app.post('/teams/:team_id',function(request,response,next){
//   console.log("stuff in app.js"); 
//   console.log(request.params.team_id);

//   var item = {"name": request.body.name,
//               "coach": request.body.coach,
//               "city": request.body.city};
//   console.log(item);

//   var successful = 
//       (item.name !== undefined) &&
//       (item.city !== undefined) &&
//       (item.coach !== undefined);

//   if (successful) {
//     data[request.params.team_id].name = item.name;
//     data[request.params.team_id].coach = item.coach;
//     data[request.params.team_id].city = item.city;
//     writeFile("./models/database.js", "var data = " + JSON.stringify(data) + "\n exports.database = data;");
//     console.log(data);
//   } else {
//     item = undefined;
//   }

//   response.send({ 
//     item: item,
//     success: successful
//   });
//   response.render('teams', {teams:[data[request.params.team_id]], index:request.params.team_id})
// });