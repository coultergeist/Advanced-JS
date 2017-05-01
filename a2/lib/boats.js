// a2/lib/boat.js

"use strict"


//begin boat array
let boats = [
    
    {type: "Hunter 260", year: "2002", beam: "9'", length: "26'", Price: "$22,000"},
    {type: "Catalina", year: "1976", beam: "10'", length: "30'", Price: "$9,000"},
    {type: "Cape Dory", year: "1975", beam: "2.92'", length: "28'", Price: "$21,000"},
    {type: "Ericson", year: "1987", beam: "11-4'", length: "35.5'", Price: "$38,000"},
    
    ];//end boat array
    
    
    console.log('There are currently: '+ boats.length + 'boat types.');

    
    //perform SEARCH of boats
    exports.get = (type) => {
        
        return boats.find((item) => {
            return item.type == type;
        });
        
    };//end search method
    
    
    
    //begin DELETE method, to delete an item from the array
    exports.delete = (type) => {
    
        const oldLength = boats.length;
        let newBoats = boats.filter((item) => {
            return item.type !== type;
        
        });//end delete method
    
        boats = newBoats;
        return {deleted: oldLength !== boats.length, total: boats.length};
    };
    
    
    
    //begin: ADD method, to add an item to the array
    exports.add = (newBoat) =>{
        
        var boatType = newBoat.type, boatYear = newBoat.year, boatBeam = newBoat.beam, boatLength = newBoat.length, boatPrice = newBoat.price;
        
        var totalBoat = {type : boatType, year : boatYear, beam : boatBeam, length : boatLength, price : boatPrice};
        boats.push(totalBoat);
        
    };//end add method