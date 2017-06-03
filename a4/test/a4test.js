// a4/test/a4test.js
//chai/mocha testing

var expect = require("chai").expect;
var boat = require("../lib/boat");


// Test 1 - Tests that work the search page.  
describe("Boat info module tests", () => {
 it("returns requested boat info", function() {
   var result = boat.get("Catalina");
   expect(result).to.deep.equal({brandname: "Ingrid", year: "1976", beam: "10'", size: "38'", price: "$38,500"});
 });
 
 it("fails w/ invalid boat", () => {
   var result = boat.get("invalid");
   expect(result).to.be.undefined;
 });

    
// Test 2 - Tests that work the add page. 
    
it("adds requested boat", function(){
        var newBoat = {brandname: "Testboat", year: "2000", beam: "10'", size: "30'", price: "$20,000"};
        var result = boat.add(newBoat);
        expect(result).to.deep.equal({"BoatAction": "added", "Total": 5});
    });
    
it("add fails", function(){
        var result = boat.add({brandname: "Failboat", year: "2000", beam: "11'", size: "31'", price: "$20,001"});
        expect(result).to.be.isUndefined; 
    });
    

// Test 3 - Tests that work the delete page.     

it("deletes boat info", function(){
        var result = boat.delete("Ericson");
        expect(result).to.deep.equal({"deleted": true, "total": 5});
    });

it("unable to delete boat", function(){
        var result = boat.delete("XXXXXXX");
        expect(result).to.deep.equal({"deleted": false, "total": 5});
    });    
    


});
