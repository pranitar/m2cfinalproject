var data = require("../models/database.js").database;
// yummly = require('yummly');

// exports.createTeam = function(req, res){
// 	res.render('create');
// };

// yummly.search({ // calling search first to get a recipe id
//   //credentials: credentials,
//   query: {
//     q: 'pasta'
//   }
// }, function (error, response, json) {
//   if (error) {
//     console.error(error);
//   } else if (response.statusCode === 200) {
//     yummly.recipe({
//       //credentials: credentials,
//       //id: json.matches[0].id // id of the first recipe returned by search
//     }, function (error, response, json) {
//       if (error) {
//         console.error(error);
//       } else {
//         console.log(json);
//       }
//     });
//   }
// });

// exports.newIngredient = function(req, res){
//   // should check to see if team already exists 
//   // (we can just assume names must be unique?)

//   // then add team to database
//   // res.render('main', { name: req.body.name, coach: req.body.coach, city: req.body.city });
// };

// exports.listIngred = function(req,res){
//   res.render('ingredients', { ingredients: data });
// }

// exports.getIngred = function(req, res){
// 	var url = req.url.split("/");
// 	var ingredid = url[2];
// 	if (ingredid >= data.length) {res.render('ingredients',{ingredients:false});};
//   res.render('ingredients', {ingredients: [data[ingredid]], index:ingredid});
// };

// exports.editTeam = function(req, res){
//   var url = req.url.split("/");
//   var id = url[2];
//   if (id >= data.length) {res.render('teams',{teams:false});};
//   res.render('teams', {teams: [data[id]], index:id});
// };

// exports.deleteTeam = function(req, res){
//   // function defined in app.js
// };