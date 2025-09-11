const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require("../utils/userRoles");

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
    role: {
        type: String,
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
        default: userRoles.USER,
    },
    image: {
        type: String,
        default: "uploads/profile.png"
    }
})

module.exports = mongoose.model("User", userSchema);