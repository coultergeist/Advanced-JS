//Danielle Coulter
//a5/index.js 

"use strict"

var boat = require ("./lib/boats.js"); 

var express = require("express"); 
var app = express(); 


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true})); 


// set template engine
var viewsPath = __dirname + '/views';  
var handlebars = require('express-handlebars').create({defaultLayout: 'main', extname: '.html', layoutsDir: viewsPath + '/layouts',  
  partialsDir: viewsPath + '/partials' });
app.engine('html', handlebars.engine);
app.set('views', viewsPath );
app.set('view engine', 'html' );


// get. Home. 
app.get('/', function(req,res){
    res.type('text/html');
    res.render('home', {boats: boat.allBoats()} );    
});


// get. About. 
app.get('/about', function(req,res){
    res.type('text/html');
    res.render('about');
});


// get. Detail.
app.get('/get', function(req,res){
    res.type('text/html'); 
    var found = boat.get(req.query.brandname); 
    res.render('details', {result: found}); 
});


// post. Detail. 
app.post('/get', function(req,res){
    res.type('text/html'); 
    var found = boat.get(req.body.brandname); 
    res.render('details', {result: found}); 
}); 


// get. Delete. 
app.get('/delete', function(req,res){
    res.type('text/html'); 
    var result = boat.delete(req.query.brandname); 
    res.render('delete', {brandname: req.query.brandname, result: result});
});


// post. Add. 
app.post('/add', function(req,res) {
    res.type('text/html');
    
    let completeBoat = {brandname : req.body.brandname, year : req.body.year, beam : req.body.beam, size : req.body.size, price : req.body.price};
    let result = boat.add(completeBoat);
    res.render('detail', {boat: completeBoat, result: result});   
    
    console.log(completeBoat);
    console.log(result); 
});

// use. 404. 

app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});


//Listen for console activity. 
app.listen(app.get('port'), function() {
    console.log('Express started. Press Ctrl+C at any time to terminate.');    
});