// a5/lib/boats.js

"use strict";


//begin boat array
let boats = [
    
    {id: 0, brandname: "Hunter 260", year: "2002", beam: "9'", size: "26'", price: "$22,000"},
    {id: 1, brandname: "Catalina", year: "1976", beam: "10'", size: "30'", price: "$9,000"},
    {id: 2, brandname: "Cape Dory", year: "1975", beam: "2.92'", size: "28'", price: "$21,000"},
    {id: 3, brandname: "Ericson", year: "1987", beam: "11-4'", size: "35.5'", price: "$38,000"},
    
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
         exports.add = (newBoat) => {
                
                var found = false;
                boats.forEach(function(item,index){
                    if (item.brandname == newBoat.brandname) {
                        found = true;
                    }
                });
                if (!found) {
                    newBoat.id = boats.length;
                    boats.push(newBoat);
                }
                var action = (found) ? "updated" : "added";
                return {"BoatAction": action, "Total": boats.length };
             };
            
            exports.allBoats = () => {
                return boats;
            };