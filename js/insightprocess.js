
let mongoose = require('mongoose');
let dbconnect = require('../db/dbconnect');
let Item = require('../models/itemModel');

let queryDB = Item.find({});

let catData = queryDB.then((items) => {
    return items;
})

console.log(catData);

// Why doesn't this console.log the results of the Item query? 


