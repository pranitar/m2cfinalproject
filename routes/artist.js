var Artist = require('../models/artist.js');

// Requires the application model
//var mongo = require("../models/mymongo.js")

var userinfo = "";

// No path:  display instructions for use
exports.index = function(req, res) {
  res.render('help', {title: 'MongoDB Test'})
};

exports.mongo = function(req, res){
  /*
   * The path parameters provide the operation to do and the collection to use
   * The query string provides the object to insert, find, or update
   */
	switch (req.params.operation) {
		case 'insert':	console.log("req.query is "+JSON.stringify(req.query));
		                mongo.insert( req.params.collection, 
		                              req.query,
		                              function(model) {
		                                res.render('mongo', {title: 'Mongo Demo', obj: model});
		                                }
		                              );
		                console.log("at end of insert case");
									 	break;
		case 'find':		mongo.find( req.params.collection, 
		                              req.query,
		                              function(model) {
              											res.render('mongo',{title: 'Mongo Demo', obj: model});
		                                }
		                              );
									 	break;
		case 'update':	mongo.update( req.params.collection, 
		                              req.query,
		                              function(model) {
              											res.render('success',{title: 'Mongo Demo', obj: model});
		                                }
		                              );
									 	break;
		}
	}
	

// In the case that no route has been matched
exports.errorMessage = function(req, res){
  var message = '<p>Error, did not understand path '+req.path+"</p>";
	// Set the status to 404 not found, and render a message to the user.
  res.status(404).send(message);
};


Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

//find specific artist
exports.getArtist = function(request, response) {
	for (i = 0; i < Artist.length-1; i++) { 
	    if(Artist[i].firstname == request.params.firstname && Artist[i].lastname == request.params.lastname){
	    	Artist = Artist[i];
	    }
	}
  response.end(JSON.stringify(Artist));
}


//update an artist
exports.postArtist = function(request, response) {
	console.log(request.params);
	var artist = {};
	for (i = 0; i < Artist.length-1; i++) { 
		console.log(Artist[i].firstname+''+request.params.firstname);
	    if(Artist[i].firstname == request.params.firstname && Artist[i].lastname == request.params.lastname){
	    	console.log('Im in this conditional');
	    	console.log(Artist[i].genre +''+ request.body.genre);
	    	if(Artist[i].genre != request.body.genre){
	    		Artist[i].genre = request.body.genre;
	    	}
	    	console.log(Artist[i].band +''+ request.body.band);
	    	if(Artist[i].band != request.body.band){
	    		Artist[i].band = request.body.band;
	    	}
	    	artist = Artist[i];
	    }
	}
	console.log(artist);
	console.log(Artist);
    response.end(JSON.stringify(artist));
}

//create a new artist
exports.putArtist = function(request, response) {
  var artist = {firstname:request.params.firstname,
  				lastname:request.params.lastname,
  				band:request.params.band, 
  				genre:request.params.genre};
  Artist.push(artist);
  console.log(Artist);
  response.end(JSON.stringify(artist));
}

//delete an artist
exports.deleteArtist = function(request, response) {
   var removed = '';
   for (i = 0; i < Artist.length-1; i++) { 
	    if(Artist[i].firstname == request.params.firstname && Artist[i].lastname == request.params.lastname){
	    	removed = Artist[i];
	    	Artist = Artist.remove(i);
	    }
	}
    console.log(Artist);
    console.log('removed'+removed);
   response.end(JSON.stringify(removed)+" This artist was removed.");
}

