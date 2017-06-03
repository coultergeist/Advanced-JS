//Danielle Coulter
//a3 index.js 
//Converting a2 to a3 using body-parser and express-handlebars

"use strict"

let boat = require ("./lib/boats.js"); 

const express = require("express"); 
const app = express(); 


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true})); 


// Set up the handlebars. 
var handlebars = require("express-handlebars"); 
app.engine(".html", handlebars({extname: '.html'})); 
app.set("view engine", ".html"); 


//send static file as response
app.get('/', function(req, res){
    res.type('text/HTML'); 
    res.sendFile(__dirname + '/public/home.html'); 
}); 


//send plain text response
app.get('/about', function(req, res){
    res.type('text/plain'); 
    res.send('About Page'); 
}); 


// delete
app.get('/delete', function(req,res){
    var result = boat.delete(req.query.type); 
    res.render('delete', {type: req.body.type, result: result});
}); 

//search-details
app.post('/get', function(req, res){
    console.log(req.body); 
    var header = 'Searching for boat type: ' + req.body.type + '<br>';
    var found = boat.get(req.body.type); 
    res.render("details", {type: req.body.type, result: found}); 
}); 

// 404 

app.use(function(req, res){
    res.type('text/plain'); 
    res.status(404); 
    res.send('404 - Page Not Found'); 
}); 

// listen for express to start up. 
app.listen(app.get('port'), function(){
    console.log('Express Started!'); 
}); 