//Danielle Coulter
//a8/index.js 

"use strict"

let express = require("express");
let bodyParser = require("body-parser"); 
let app = express();
let Boat = require("./models/boat"); 
// let cors = require('cors'); 


// Configure Express app
app.set('port', process.env.PORT || 3000); 
app.use(express.static(__dirname + '/../public')); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 
app.use('/api', require('cors')()); 
app.use((err, req, res, next) => {
    console.log(err); 
})

// template 
let handlebars = require("express-handlebars"); 
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main'})); 
app.set("view engine", ".html"); 


// get. Home. 
app.get('/', (req, res) => {
    Boat.find((err,boats) => {
        if (err) return next(err); 
        res.render('home', {boats: JSON.stringify(boats)}); 
    });
});



// get. About. 
app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});



// get. api's. 
 app.get('/api/boat/:brandname', (req, res, next) => {
    let brandname = req.params.brandname; 
    console.log(brandname); 
    Boat.findOne({brandname: brandname}, (err, result) => {
        if (err || !result) return next(err); 
        res.json( result ); 
    }); 
});


app.get('/api/boats', (req, res, next) => {
    Boat.find((err, results) => {
        if (err || !results) return next (err); 
        res.json(results);   
    }); 
});


app.get('/api/boat/delete/:id', (req, res, next) => {
    Boat.remove({"_id":req.params.id}, (err, result) => {
        if (err) return next(err); 
        res.json({"deleted": result.result.n}); 
    });
});


app.get('/api/add/', (req, res, next) => {
    // find and update existing items, or add a new one. 
    if(!req.body._id) { // Insert a new document.
        let boat = new Boat({brandname:req.body.brandname, 
        year: req.body.year, 
        beam: req.body.beam, 
        size: req.body.size, 
        price: req.body.price}); 
                          
            boat.save((err,newBoat) => {
                                  
            if (err) return next (err); 
            console.log(newBoat) 
            res.json({updated: 0, _id: newBoat._id }); 
    });  
         
    } else { // Update  existing document. 
        Boat.updateOne({ _id: req.body._id}, {brandname: req.body.brandname, year: req.body.year, beam: req.body.beam, size: req.body.size, price: req.body.price}, (err, result) => {
            if (err) return next(err); 
            res.json({updated: result.nModified, _id: req.body._id}); 
        });
    }
}); 


app.get('api/add/:brandname/:year/:beam/:size/:price', (req, res, next) => {
    // find & update existing item, or add new item
    let brandname = req.params.brandname; 
    Boat.update({brandname: brandname}, {brandname: brandname, year: req.params.year, beam: req.params.beam, size: req.params.size, price: req.params.price}, {upsert: true}, (err, result) => {
        if (err) return next (err); 
        //nModified = 0 for a new item, 1+ for a new item. 
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