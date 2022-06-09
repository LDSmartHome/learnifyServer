const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

// Setting up the schema
const User = new mongoose.Schema({
    user: String,
    pwd: String,
})

// Setting up the passport plugin
User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)