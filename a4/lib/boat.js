// a4/lib/boat.js

"use strict";


//begin boat array
let boats = [
    
    {brandname: "Hunter 260", year: "2002", beam: "9'", size: "26'", price: "$22,000"},
    {brandname: "Catalina", year: "1976", beam: "10'", size: "30'", price: "$9,000"},
    {brandname: "Cape Dory", year: "1975", beam: "2.92'", size: "28'", price: "$21,000"},
    {brandname: "Ericson", year: "1987", beam: "11-4'", size: "35.5'", price: "$38,000"},
    
    ];//end boat array

    
    //perform SEARCH of boats
    exports.get = (brandname) => {
        
        return boats.find((item) => {
            return item.brandname == brandname;
        });
        
    };//end search method
    
    
    
    //begin DELETE method, to delete an item from the array
    exports.delete = (brandname) => {
    
        const oldLength = boats.length;
        let newBoats = boats.filter((item) => {
            return item.brandname !== brandname;
        
        });//end delete method
    
        boats = newBoats;
        return {deleted: oldLength !== boats.length, total: boats.length};
    };
    
        //begin: ADD method, to add an item to the array
    exports.add = (newBoat) =>{
        
          for (var i = 0; i < boats.length; i++) {
        if(newBoat.brandname == boats[i].brandname) {
            return; 
        }
    }
        
        var boatBrandname = newBoat.brandname, boatYear = newBoat.year, boatBeam = newBoat.beam, boatSize = newBoat.size, boatPrice = newBoat.price, boatLen = boats.length;
        
        var totalBoat = {brandname : boatBrandname, year : boatYear, beam : boatBeam, size : boatSize, price : boatPrice};
        boats.push(totalBoat);
        
        var added = (boatLen = boats.length) ? "" : "added"; 
        return {"BoatAction": added, "Total": boats.length}; 
        
    };//end add method