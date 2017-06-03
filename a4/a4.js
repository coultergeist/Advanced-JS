// a4/a4.js


"use strict";

var names = ["sara", "joe", "dave", "ann"];

var newArray = names.map (function(item) {
    return item.toUpperCase();

});

names = newArray;