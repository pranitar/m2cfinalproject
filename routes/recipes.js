var data = require("../models/database.js");

exports.newRecipe = function(req, res){

	var recipe = {"name": req.query.name,
              "cuisine": req.query.cuisine,
              "ingredients": req.query.ingredients};

	  var successful = 
	      (recipe.name !== undefined) &&
	      (recipe.cuisine !== undefined) &&
	      (recipe.ingredients !== undefined);

	  if (successful) {
	    data.insert(recipe);
	    data.findAll("recipes", function(data){res.render("recipes", {recipes: data});});
	  } else {
	    recipe = undefined;
	  }
}