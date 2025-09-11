const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, "Feild must be a valid email address"],
    },
    password: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model("User", userSchema);