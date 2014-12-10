var data = require("../models/database.js").database

exports.newRecipe = function(req, res){
};

// exports.listIngreds = function(req,res){
// 	var url = req.url.split("/");
// 	var id = url[2];
// 	if (id >= data.length) {res.render('recipes',{recipes:false});};
//   	res.render('ingredients', {recipes:data[id], index:id, ingredid: undefined});
// }

// exports.getIngred = function(req, res){
//   	var url = req.url.split("/");
// 	var teamid = url[2];
// 	var pid = url[4];
// 	if (teamid >= data.length) {res.render('recipes',{recipes:false});};
// 	res.render('ingredients', {team:data[teamid], ingredid:pid, ingredid:ingredid});
// };

// exports.editIngred = function(req, res){
// 	var url = req.url.split("/");
// 	var recipeid = url[2];
// 	var pid = url[4];
// 	if (recipeid >= data.length) {res.render('recipes',{recipes:false});};
// 	res.render('ingredients', {recipe:data[recipeid], ingredid:pid, recipeid:recipeid});
// };

// exports.deleteIngred = function(req, res){
// };

// var data = require("../models/database.js").database

// exports.newPlayer = function(req, res){
//   // in app.js aint nobody got time for this
// };

// exports.listPlayers = function(req,res){
// 	var url = req.url.split("/");
// 	var id = url[2];
// 	if (id >= data.length) {res.render('teams',{teams:false});};
//   	res.render('players', {team:data[id], index:id, playerid: undefined});
// }

// exports.getPlayer = function(req, res){
//   	var url = req.url.split("/");
// 	var teamid = url[2];
// 	var pid = url[4];
// 	if (teamid >= data.length) {res.render('teams',{teams:false});};
// 	res.render('players', {team:data[teamid], playerid:pid, teamid:teamid});
// };

// exports.editPlayer = function(req, res){
// 	var url = req.url.split("/");
// 	var teamid = url[2];
// 	var pid = url[4];
// 	if (teamid >= data.length) {res.render('teams',{teams:false});};
// 	res.render('players', {team:data[teamid], playerid:pid, teamid:teamid});
// };

// exports.deletePlayer = function(req, res){
//   // in app.js aint nobody got time for this
// };