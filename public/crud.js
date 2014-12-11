// Global datastore
var recipes = [];
var ingredients = [];

// add new recipe
function addRecipe(){
	var newRecipe = {};
	
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

	updatedRecipe.name = tname;
	updatedRecipe.cuisine = tcuisine;

	window.edit(tname, tcuisine, index);
}
function edit(name, cuisine, index) {
  $.ajax({
    	url: "/recipes/" + index,
		type: "post",
    	data: {"name": rname, "cuisine": rcuisine, index:index},
    	success: function(data) { location.reload() }
  });
}

// delete team
function deleteTeam(id){		
	window.deletethis(id);
}
function deletethis(id) {	
  $.ajax({
    	url: "/recipes/"+id,
		type: "delete",
    	success: function(data) { window.alert("You sure?"); window.location.assign('/recipes'); }
  });
}

// add ingredient
function addIngred(){
	var newIngred = {};
	
	var ingredn = $('#ingredname').val();

	newIngred.name = ingredn;

	players.push(newIngred);
	window.adding(ingredn);

	// Clear Inputs
	$('#ingredname').val("");
}
function adding(name, recipe) {	
  $.ajax({
    	url: "/ingredients",
		type: "put",
    	data: {"name": name, "recipe": recipe},
    	success: function(data) { }
  });
}

// edit player
function editIngred(pindex, tindex){
	var uptdrecipe = {};

	var nm = $('#plname-input').val();

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
    	data: {"name":name, "players":players, "coach":coach},
    	success: function(data) {location.reload()}
  });
}

// delete player
function deletePlayer(ingredid, recipeid){	
	window.deleting(ingredid, recipeid);
}
function deleting(ingredid, recipeid) {		
  $.ajax({
    	url: "/recipes/"+recipeid+"/ingredients/"+ingredid,
		type: "delete",
    	success: function(data) { window.alert("You sure?"); window.location.assign('/recipes/'+recipeid+'/ingredients'); }
  });
}