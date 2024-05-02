const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    aadharcard: String,
    mobile: String,
    pancard: String,
    dob: String,
    gender: String,
    image: String,
    address: String
}, {
    timestamps: true
});

var userModel = mongoose.model('Users', userSchema);
module.exports = userModel;