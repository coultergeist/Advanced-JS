//a7/test_db.js 

var Boat = require("./models/boat");

// Insert a new boat into the database
new Boat({id: 0, brandname: "Endeavor", year: "1978", beam: "8'", size: "37'", price: "$27,900"}).save();
new Boat({id: 1, brandname: "Fisher", year: "1974", beam: "10'", size: "30'", price: "$39,900"}).save();
new Boat({id: 2, brandname: "Malabar", year: "1956", beam: "8.25'", size: "33'", price: "$36,500"}).save();
new Boat({id: 3, brandname: "MacGregor", year: "2007", beam: "9'", size: "26'", price: "$27,499"}).save();



// find all documents 
Boat.find(function(err, boats) {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(boats);
    }
});