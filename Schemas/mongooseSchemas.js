const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    dateCreated: {type: Date, default: Date.now},
    lastName: String,
    phoneNumber: String,
    bio: String,
    admin: Boolean,
    profileImage: String,
    adoptedPets: Array,
    fosteredPets: Array,
    interested: Array ,
})

module.exports = mongoose.model('User', userSchema)