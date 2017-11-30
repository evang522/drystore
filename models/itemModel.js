let mongoose = require('mongoose');


let itemSchema = mongoose.Schema({
    name: String,
    storageUnit: String,
    quantity: Number,
    manufacturer: String,
    category: String,
    servings: String,
    unpreparedserving: Number,
    preparedserving: Number,
    expiration: Number,
    info: String
})

let Item = module.exports = mongoose.model('Item', itemSchema);