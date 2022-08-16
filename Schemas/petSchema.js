const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    petName: String,
    type: String,
    bio: String,
    breed: String,
    dateCreated: {type: Date, default: Date.now},
    height: {type: Number, min :1, max: 100},
    weight: {type: Number, min :1, max: 100},
    dietery: Array
})

module.exports = mongoose.model('Pets', petSchema)