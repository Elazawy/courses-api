const Course = require("../models/course.model");
const {isValidObjectId} = require("mongoose");
const {SUCCESS, FAIL, ERROR} = require("../utils/httpStatusText");
const validationResult = require('express-validator').validationResult;

const getAllCourses = async (req, res) => {
    try {
        const queries = req.query;
        let num_skips = (req.query.page - 1) * req.query.limit;
        let limit = req.query.limit;
        const courses = await Course.find({}, {__v: false}).skip(num_skips).limit(limit);
        res.status(200).json({status: SUCCESS, data: {courses: courses}});
    }
    catch (error) {
        res.status(500).json({status: ERROR, data: null, message: error.message});
    }
}

const addCourse = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({status: FAIL,data: null, message: errors.array()});
        }
        const course = await new Course(req.body);
        await course.save();
        res.status(200).json({status: SUCCESS, data: {course: course}});
    }
    catch (error) {
        res.status(500).json({status: ERROR, data: null, message: error.message});
    }
}

const getCourse = async (req, res) => {
    try{
        const id = req.params.courseId;
        if(!isValidObjectId(id)){
            res.status(400).json({status: FAIL,data: null, message: "Invalid ID"});
        }
        const course = await Course.findOne({_id : id}, {__v: false});
        if(!course) return res.status(404).json({status: FAIL, data: null, message: "Course not found"});
        res.status(200).json({status: SUCCESS, data: {course: course}});
    }
    catch (error) {
        res.status(500).json({status: ERROR, data: null, message: error.message});
    }
}

const updateCourse = async (req, res) => {
    try {
        const id = req.params.courseId;
        if(!isValidObjectId(id)){
            res.status(400).json({status: FAIL,data: null, message: "Invalid ID"});
        }
        let course = await Course.findOne({_id : req.params.courseId});
        if(!course) return res.status(404).json({status: FAIL,data: null, message: "Course not found"});
        course = await Course.findByIdAndUpdate({_id : req.params.courseId}, {...req.body});
        res.status(200).json({status: SUCCESS, data: {course: course}});
    }
    catch (error) {
        res.status(500).json({status: ERROR,data: null, message: error.message});
    }
}

const deleteCourse = async (req, res) => {
    try{
        const id = req.params.courseId;
        if(!isValidObjectId(id)){
            res.status(400).json({status: FAIL,data: null, message: "Invalid ID"});
        }
        const course = await Course.findOne({_id : req.params.courseId}, {__v: false});
        if(!course) return res.status(404).json({status: FAIL,data: null, message: "Course not found"});
        await Course.deleteOne({_id : req.params.courseId}, );
        res.status(200).json({status: SUCCESS, data: {course: course}});
    }
    catch (error) {
        res.status(500).json({status: ERROR,data: null ,message: error.message});
    }
}

module.exports = {
    getAllCourses,
    addCourse,
    getCourse,
    updateCourse,
    deleteCourse,
}