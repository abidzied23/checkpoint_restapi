let mongoose = require("mongoose");
let user = new mongoose.Schema({
    user_name: String,
    password: String,
    age: Number
})
module.exports = mongoose.model('users', user)