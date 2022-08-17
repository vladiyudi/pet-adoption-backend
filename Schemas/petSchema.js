const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: String,
    type: String,
    bio: String,
    breed: String,
    color: String,
    dateCreated: {type: Date, default: Date.now},
    height: {type: Number, min :1, max: 100},
    weight: {type: Number, min :1, max: 100},
    dietary: Array,
    hypoallergenic: Boolean,
    picture: {type: String, default:'https://www.petzone.co.ke/wp-content/uploads/2021/02/cat.png'},
    adoptionStatus: {type: String, default: "Available"},
    adoptedBy: {type: String, default: ""},
    fosteredBy: {type: String, default: ""},
})

module.exports = mongoose.model('Pets', petSchema)