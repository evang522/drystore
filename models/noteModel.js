let mongoose = require('mongoose');


let noteSchema = mongoose.Schema({
    subject:'String',
    body:'String',
    tags:'String'
})

let Note = module.exports = mongoose.model('Note', noteSchema);