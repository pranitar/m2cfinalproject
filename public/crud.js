var util = require("util");
var mongoClient = require('mongodb').MongoClient;
/*
 * This is the connection URL
 * Give the IP Address / Domain Name (else localhost)
 * The typical mongodb port is 27012
 * The path part (here "mtwocdatabase") is the name of the database
 */
var url = 'mongodb://localhost:27017/mtwocdatabase';
var mongoDB; // The connected database
// Use connect method to connect to the Server
mongoClient.connect(url, function(err, db) {
  if (err) doError(err);
  console.log("Connected correctly to server");
  mongoDB = db;
});

// Global datastore
var recipes = [];
var ingredients = [];
var users = [];

// add new recipe
function addRecipe(){
	var newRecipe = {};

	// console.log("adding new recipe");	
	var tname = $('#rname').val();
	var tcuisine = $('#rcuisine').val();

	newRecipe.name = tname;
	newRecipe.ingredients = [];
	newRecipe.cuisine = tcuisine;

	recipes.push(newRecipe);	
	window.add(rname, rcuisine);

	// Clear Inputs
	$('#rname').val("");
	$('#rcuisine').val("");
}

function add(name, cuisine) {
  $.ajax({
    	url: "/recipes",
		type: "put",
    	data: {"name": name, "ingredients": [], "cuisine": cuisine},
    	success: function(data) { }
  });
}

// edit team
function editRecipe(index){
	var index = index;
	var updatedTeam = {};

	var tname = $('#rname').val();
	var tcuisine = $('#rcuisine').val();

	updatedTeam.name = tn;
	updatedTeam.city = tc;
	updatedTeam.coach = tco;

	window.edit(tn, tco, tc, index);
}
function edit(name, coach, city, index) {
	console.log(index);
	console.log("running ajax stuff");	
  $.ajax({
    	url: "/teams/" + index,
		type: "post",
    	data: {"name": name, "city": city, "coach": coach, index:index},
    	success: function(data) { location.reload() }
  });
}

// delete team
function deleteTeam(id){
	console.log("just before calling ajax-delete");
	console.log(id);		
	window.deletethis(id);
}
function deletethis(id) {
	console.log("running ajax-delete stuff");	
	console.log(id);	
  $.ajax({
    	url: "/teams/"+id,
		type: "delete",
    	success: function(data) { window.alert("You sure?"); window.location.assign('/teams'); }
  });
}

// add ingredient
function addIngred(){
	var newIngred = {};
	
	var pn = $('#playername-input').val();
	var pt = $('#team-input').val();

	newIngred.name = pn;
	newIngred.team = pt;

	players.push(newIngred);
	window.addpl(pn, pt);

	// Clear Inputs
	$('#playername-input').val("");
	$('#team-input').val("");
}
function addpl(name, recipe) {
	console.log("running ajax stuff");	
  $.ajax({
    	url: "/players",
		type: "put",
    	data: {"name": name, "team": recipe},
    	success: function(data) { }
  });
}

// edit player
function editPlayer(pindex, tindex){
	var uptdrecipe = {};

	var nm = $('#plname-input').val();
	var te = $('#recipen-input').val();
	var tc = $('#city-input').val();
	var tco = $('#coach-input').val();
	var pl = $('#players-input').val();

	var playaz = pl.split(",");
	playaz[pindex] = nm;

	uptdrecipe.rname 	= te;
	uptdrecipe.players 	= playaz;
	uptdrecipe.coach 		= tco;
	uptdrecipe.city 		= tc;

	window.editpl(uptdrecipe.recipename, uptdrecipe.players, uptdrecipe.coach, uptdrecipe.city, pindex, tindex);
}
function editpl(name, players, coach, city, pindex, tindex) {
	console.log("running ajax stuff for edit");	
  $.ajax({
    	url: "/recipes/" + tindex + "/players/" + pindex,
		type: "post",
    	data: {"name":name, "players":players, "coach":coach, "city":city},
    	success: function(data) {location.reload()}
  });
}

// delete player
function deletePlayer(pid, tid){
	console.log("just before calling ajax-delete");		
	window.deletethisplayer(pid, tid);
}
function deletethisplayer(pid, tid) {
	console.log("running ajax-delete stuff");		
  $.ajax({
    	url: "/recipes/"+tid+"/players/"+pid,
		type: "delete",
    	success: function(data) { window.alert("You sure?"); window.location.assign('/recipes/'+tid+'/players'); }
  });
}