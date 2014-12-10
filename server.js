var express = require('express'),
  routes = require('./routes/slash'),
  recipes = require('./routes/recipes'),
  ingredients = require('./routes/ingredients'),
  // search = require('yummly/test/search'),
  // recipe = require('yummly/test/recipe'),
	data = require('./models/database').database;
	// path = require('path');

var fs = require("fs");
var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views'); // Set the directory for views
  app.set('view engine', 'ejs');  // Set the view engine to EJS
  app.use(express.favicon());	// Return a favicon if requested
  app.use(express.logger('tiny'));	// Log requests to the console.log
  app.use(express.bodyParser());	// Parse the request body into req.body object
  app.use(express.methodOverride()); // Allows you to override HTTP methods on old browsers
  app.use(app.router); // Do the routes defined below
  app.use(express.static(__dirname + '/public'));	// Process static files
});

// reading db file
function readFile(filename, defaultData, callbackFn) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      console.log("Error reading file: ", filename);
      data = defaultData;
    } else {
      console.log("Success reading file: ", filename);
    }
    if (callbackFn) callbackFn(err, data);
  });
}

// writing to db file
function writeFile(filename, data, callbackFn) {
  fs.writeFile(filename, data, function(err) {
    if (err) {
      console.log("Error writing file: ", filename);
    } else {
      console.log("Success writing file: ", filename);
    }
    if (callbackFn) callbackFn(err);
  });
}

// index page
app.get('/', routes.pathless);
//Index page - redirects to index.html and displays a basic search results page
// app.get('/users', user.list);
// //- User model - provides a list of users currently also using the app that you can share recipes and messages with
// app.get('/users/popular', user.popular);
// // - User model - displays the “Top 5 Most Popular Recipes”
// app.get('/:ingredient', ingredient.search);
// // - Ingredient model - provides a list of all the recipes that fit the search criteria of the user (up to 5 ingredient limitation)
// app.get('/:ingredient/recipes', ingredient.showRecipes);
// - Ingredient model - provides a list of the top 10 recipes using one specific ingredient provided
//app.post('/recipe/new', recipe.newPost);
// - Recipe model - allows user the ability to add a new recipe


// new team
app.put('/recipes',recipes.newRecipe);
app.put("/recipes", function(request, response) {

  var recipe = {"name": request.body.rname,
              "cuisine": request.body.rcuisine,
              "ingredients": []};

  var successful = 
      (recipe.name !== undefined) &&
      (recipe.cuisine !== undefined) &&
      (recipe.ingredients !== undefined);

  if (successful) {
    data.push(recipe);
    writeFile("./models/database.js", "var data = " + JSON.stringify(data) + "\n exports.database = data;");
  } else {
    recipe = undefined;
  }

  response.send({ 
    recipe: recipe,
    success: successful
  });
});

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

// app.post('teams/:team_id',teams.editTeam);

// list teams
// app.get('/teams',teams.listTeams);

// // show one team
// // app.get('/teams/:team_id',teams.getTeam);

// // delete one team - delete contained in body
// app.delete('/teams/:team_id',function(request, response) {
// 	console.log("DELETING!!");

// 	var url = request.url.split("/");
// 	var id = url[2];
// 	console.log("id is "+id);
// 	if (id >= data.length) {response.render('teams',{teams:false});};
// 	var team = [data[id]];  
// 	console.log("team is "+team);

// 	var temp = [];
// 	while (data.length>id){
// 		console.log("before pop, length of data is "+data.length);
// 		temp.push(data.pop());
// 	}

//   temp.pop();
// 	while (temp.length>0){
// 		console.log("before push, length of data is "+data.length);
// 		data.push(temp.pop());
// 	}	

//   writeFile("./models/database.js", "var data = " + JSON.stringify(data) + "\n exports.database = data;");
//   console.log(data);
// 	response.render('main', {teams: team});
// 	// window.alert("Team deleted");

// });

// // new players
// app.put('/players', function(request, response) {
//   console.log("stuff in app.js"); 

//   var item = {"name": request.body.name,
//               "team": request.body.team};
//   console.log(item);

//   var teamnames = [];
//   for(var i=0; i<data.length; i++) {
//       teamnames.push(data[i].name);
//     }

//   var successful = 
//       (item.name !== undefined) &&
//       (item.team !== undefined && teamnames.indexOf(item.team) >= 0);

//   if (successful) {
//     console.log("successful " + data);
//     for(var i=0; i<data.length; i++) {
//       if (data[i].name == item.team) {
//         data[i].players.push(item.name)
//       }
//     }
//     writeFile("./models/database.js", "var data = " + JSON.stringify(data) + "\n exports.database = data;");
//     console.log(data);
//   } else {
//     item = undefined;
//   }

//   response.send({ 
//     item: item,
//     success: successful
//   });
// });

// // get players list by team
// app.get('/teams/:team_id/players',players.listPlayers);

// // get players by team and id
// app.get('/teams/:team_id/players/:player_id',players.getPlayer);  

// // edit players
// app.post('/teams/:team_id/players/:player_id',function(request,response,next){
//   console.log("stuff in app.js"); 
//   console.log(request.params.team_id);
//   console.log("wtfmate" + request.params.player_id);

//   var teamid = request.params.team_id;
//   var playid = request.params.player_id;
//   var teamnames = [];
//   for(var i=0; i<data.length; i++) {
//       teamnames.push(data[i].name);
//   }

//   var item = {"name": request.body.name,
//               "players": request.body.players,
//               "coach": request.body.coach,
//               "city": request.body.city};
//   console.log(item);

//   var successful = 
//       (item.name !== undefined && teamnames.indexOf(item.name) >= 0) &&
//       (item.city !== undefined) &&
//       (item.coach !== undefined) && 
//       (item.players !== undefined && typeof(item.players) == "object");

//   if (successful) {
//     data[teamid].name = item.name;
//     data[teamid].coach = item.coach;
//     data[teamid].city = item.city;
//     data[teamid].players = item.players;
//     writeFile("./models/database.js", "var data = " + JSON.stringify(data) + "\n exports.database = data;");
//   } else {
//     item = undefined;
//   }

//   response.send({ 
//     item: item,
//     success: successful
//   });
//   response.send('/teams/'+teamid+'/players/'+playid, {"team":data[teamid], "playerid":playid})
// });

// // delete players
// app.delete('/teams/:team_id/players/:player_id',function(request, response) {
//   console.log("DELETING!!");

//   var teamid = request.params.team_id;
//   var playid = request.params.player_id;

//   if (teamid >= data.length) {response.render('teams',{teams:false});};
//   if (playid >= data[teamid].players.length) {response.render('players',{teams:false});};

//   var temp = [];
//   while (data[teamid].players.length > playid) {
//     console.log("before pop, length of data is "+data.length);
//     temp.push(data[teamid].players.pop());
//   }

//   temp.pop();
//   while (temp.length > 0){
//     console.log("before push, length of data is "+data.length);
//     data[teamid].players.push(temp.pop());
//   } 

//   var team = data[teamid];  

//   writeFile("./models/database.js", "var data = " + JSON.stringify(data) + "\n exports.database = data;");
//   console.log(data);
//   response.render('main', {teams: team});
//   // window.alert("Team deleted");

// });

app.listen(44445);
console.log("Express server running on port 44445");

// #!/bin/env node
// //  OpenShift sample Node application
// var express = require('express');
// var fs      = require('fs');


// /**
//  *  Define the sample application.
//  */
// var SampleApp = function() {

//     //  Scope.
//     var self = this;


//     /*  ================================================================  */
//     /*  Helper functions.                                                 */
//     /*  ================================================================  */

//     /**
//      *  Set up server IP address and port # using env variables/defaults.
//      */
//     self.setupVariables = function() {
//         //  Set the environment variables we need.
//         self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
//         self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

//         if (typeof self.ipaddress === "undefined") {
//             //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
//             //  allows us to run/test the app locally.
//             console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
//             self.ipaddress = "127.0.0.1";
//         };
//     };


//     /**
//      *  Populate the cache.
//      */
//     self.populateCache = function() {
//         if (typeof self.zcache === "undefined") {
//             self.zcache = { 'index.html': '' };
//         }

//         //  Local cache for static content.
//         self.zcache['index.html'] = fs.readFileSync('./index.html');
//     };


//     /**
//      *  Retrieve entry (content) from cache.
//      *  @param {string} key  Key identifying content to retrieve from cache.
//      */
//     self.cache_get = function(key) { return self.zcache[key]; };


//     /**
//      *  terminator === the termination handler
//      *  Terminate server on receipt of the specified signal.
//      *  @param {string} sig  Signal to terminate on.
//      */
//     self.terminator = function(sig){
//         if (typeof sig === "string") {
//            console.log('%s: Received %s - terminating sample app ...',
//                        Date(Date.now()), sig);
//            process.exit(1);
//         }
//         console.log('%s: Node server stopped.', Date(Date.now()) );
//     };


//     /**
//      *  Setup termination handlers (for exit and a list of signals).
//      */
//     self.setupTerminationHandlers = function(){
//         //  Process on exit and signals.
//         process.on('exit', function() { self.terminator(); });

//         // Removed 'SIGPIPE' from the list - bugz 852598.
//         ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
//          'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
//         ].forEach(function(element, index, array) {
//             process.on(element, function() { self.terminator(element); });
//         });
//     };


//     /*  ================================================================  */
//     /*  App server functions (main app logic here).                       */
//     /*  ================================================================  */

//     /**
//      *  Create the routing table entries + handlers for the application.
//      */
//     self.createRoutes = function() {
//         self.routes = { };

//         self.routes['/asciimo'] = function(req, res) {
//             var link = "http://i.imgur.com/kmbjB.png";
//             res.send("<html><body><img src='" + link + "'></body></html>");
//         };

//         self.routes['/'] = function(req, res) {
//             res.setHeader('Content-Type', 'text/html');
//             res.send(self.cache_get('index.html') );
//         };
//     };


//     /**
//      *  Initialize the server (express) and create the routes and register
//      *  the handlers.
//      */
//     self.initializeServer = function() {
//         self.createRoutes();
//         self.app = express.createServer();

//         //  Add handlers for the app (from the routes).
//         for (var r in self.routes) {
//             self.app.get(r, self.routes[r]);
//         }
//     };


//     /**
//      *  Initializes the sample application.
//      */
//     self.initialize = function() {
//         self.setupVariables();
//         self.populateCache();
//         self.setupTerminationHandlers();

//         // Create the express server and routes.
//         self.initializeServer();
//     };


//     /**
//      *  Start the server (starts up the sample application).
//      */
//     self.start = function() {
//         //  Start the app on the specific interface (and port).
//         self.app.listen(self.port, self.ipaddress, function() {
//             console.log('%s: Node server started on %s:%d ...',
//                         Date(Date.now() ), self.ipaddress, self.port);
//         });
//     };

// };   /*  Sample Application.  */



// /**
//  *  main():  Main code.
//  */
// var zapp = new SampleApp();
// zapp.initialize();
// zapp.start();



