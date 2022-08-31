const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    bio: String,
    breed: {type: String, required: true},
    color: String,
    dateCreated: {type: Date, default: Date.now},
    height: {type: Number, min :1, max: 100},
    weight: {type: Number, min :1, max: 100},
    dietary: Array,
    hypoallergenic: Boolean,
    picture: {type: String, default:'https://thumbs.dreamstime.com/b/face-dog-adorable-pedigree-outline-illustration-eps-84615014.jpg'},
    adoptionStatus: {type: String, default: "Available"},
    owner: {type: String, default: ""},
})

module.exports = mongoose.model('Pets', petSchema)