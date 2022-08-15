const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    date: String,
    id: String,
    lastName: String,
    phoneNumber: String,
    bio: String,
    adoptedPets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
    fosteredPets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}]
})

module.exports = mongoose.model('User', userSchema)

const petSchema = new mongoose.Schema({
    name: String,
    type: String,
    bio: String,
    dateCreated: {type: Date, default: Date.now},
    height: {type: Number, min :1, max: 100},
    weight: {type: Number, min :1, max: 100},
    dietery: []

})