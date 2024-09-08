const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: "String",
    password: "String",
    email: "String",
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;