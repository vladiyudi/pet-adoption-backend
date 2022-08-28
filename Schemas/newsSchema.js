const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    news: String,
    dateCreated: {type: Date, default: Date.now},
})


module.exports = mongoose.model('News', newsSchema)