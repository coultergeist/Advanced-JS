//Danielle Coulter
//a7/index.js 

"use strict"

var Boat = require("./models/boat"); 

var express = require("express"); 
var app = express(); 


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));
app.use(require("body-parser").urlencoded({extended: true}));
app.use ((err, req, res, next) => {
    console.log(err)
}); 


// template 
let handlebars = require("express-handlebars");  
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set('view engine', 'html' );


// get. Home. 
app.get('/', (req, res) => {
    Boat.find((err,boats) => {
        if (err) return next(err); 
        res.render('home', {boats: boats}); 
    });
});

// get.Search 

app.get('/', (req, res) => {
    Boat.find((err,boats) => {
        if (err) return next(err); 
        res.render('home', {boats: boats}); 
    });
});


// get. About. 
app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});


// get. Detail.
app.get('/get', (req,res) => {
   Boat.findOne ({ brandname:req.query.brandname }, (err, boat) => {
       if (err) return next(err); 
       res.type('text/html');
       res.render('details', {result: boat}); 
   });  
});


// post. Detail. 
app.post('/get', (req,res) => {
   Boat.findOne ({ brandname:req.body.brandname }, (err, boat) => {
       if (err) return next(err); 
       res.type('text/html');
       res.render('details', {result: boat}); 
   });  
});


// get. Delete. 
app.get('/delete', (req,res) => {
   Boat.remove ({brandname: req.query.brandname }, (err, result) => {
        if (err) return next (err); 
       let deleted = result.result.n !== 0; 
       Boat.count((err, total) => {
            res.type('text/html'); 
            res.render('delete', {brandname: req.query.brandname, deleted: result.result.n !== 0, total: total} );
       });
   }); 
});


// get. find. 
 app.get('/api/boat/:brandname', (req, res, next) => {
    let brandname = req.params.brandname; 
    console.log(brandname); 
    Boat.findOne({brandname: brandname}, (err, result) => {
        if (err || !result) return next(err); 
        res.json( result ); 
    }); 
});


// Get. Find.
app.get('/api/boat', (req, res, next) => {
    Boat.find((err, results) => {
        if (err || !results) return next (err); 
        res.json(results);   
    }); 
});


// Get. Remove/Delete.
app.get('/api/boat/delete/:brandname', (req,res) => {
    Boat.remove({"brandname" :req.params.brandname}, (err, result) => {
        if (err) return (err); 
        res.json({"deleted": result.result.n});    
    }); 
});

// Get. add. 

app.get('/api/boat/add/:brandname/:year/:beam/:size/:price', (req, res, next) => {
    // find and update existing items, or add a new one. 
    let brandname = req.params.brandname; 
    Boat.update({ brandname: brandname}, {brandname:brandname, year: req.params.year, beam: req.params.beam, size: req.params.size, price: req.params.price }, {upsert: true }, (err, result) => {
        if (err) return next(err); 
        res.json({updated: result.nModified}); 
    }); 
}); 

// use. 404. 
app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});


//Listen for console activity. 
app.listen(app.get('port'), () => {
    console.log('Express started. Press Ctrl+C at any time to terminate.');    
});  