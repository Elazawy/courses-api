const mongoose = require("mongoose");
const Schema = require('mongoose').Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
