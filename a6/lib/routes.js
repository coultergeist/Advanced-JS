// a6/lib/routes/js

"use strict";

module.exports = function(app) {
    var Boat = require("../models/boat"); 
    var path = require('path'); 
}

var express = require("express");
var app = express();

// configure Express app
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



// UI Routes

// Handlebars version
app.get('/old', function(req,res){
    Boat.find(function (err, boats){
        if (err) return next(err); 
        if (!boats) return next(); 
        res.type('text/html'); 
        res.render('home', {boats: boats} ); 
    }); 
}); 