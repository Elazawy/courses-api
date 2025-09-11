const Course = require("../models/course.model");
const {isValidObjectId} = require("mongoose");
const {SUCCESS, FAIL, ERROR} = require("../utils/httpStatusText");
const validationResult = require('express-validator').validationResult;
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');

const getAllCourses = asyncWrapper(
    async (req, res) => {
        const queries = req.query;
        let num_skips = (req.query.page - 1) * req.query.limit;
        let limit = req.query.limit;
        const courses = await Course.find({}, {__v: false}).skip(num_skips).limit(limit);
        res.status(200).json({status: SUCCESS, data: {courses: courses}});
    }
)

const addCourse = asyncWrapper(
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = appError.create(400, FAIL, errors.array());
            return next(error);
        }
        const course = await new Course(req.body);
        await course.save();
        res.status(200).json({status: SUCCESS, data: {course: course}});
    }
)

const getCourse = asyncWrapper(
    async(req, res, next) => {
        const id = req.params.courseId;
        if(!isValidObjectId(id)){
            const error = appError.create(400, FAIL, "objectId is not valid");
            return next(error);
        }
        const course = await Course.findOne({_id : id}, {__v: false});
        if(!course) {
            const error = appError.create(404, FAIL, "Course not found");
            return next(error);
        }
        res.status(200).json({status: SUCCESS, data: {course: course}});
    }
)

const updateCourse = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.courseId;
        if(!isValidObjectId(id)){
            const error = appError.create(400, FAIL, "objectId is not valid");
            return next(error);
        }
        let course = await Course.findOne({_id : req.params.courseId});
        if(!course) return res.status(404).json({status: FAIL,data: null, message: "Course not found"});
        course = await Course.findByIdAndUpdate({_id : req.params.courseId}, {...req.body});
        res.status(200).json({status: SUCCESS, data: {course: course}});
    }
)


const deleteCourse = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.courseId;
        if(!isValidObjectId(id)){
            const error = appError.create(400, FAIL, "objectId is not valid");
            return next(error);
        }
        const course = await Course.findOne({_id : req.params.courseId}, {__v: false});
        if(!course) return res.status(404).json({status: FAIL,data: null, message: "Course not found"});
        await Course.deleteOne({_id : req.params.courseId}, );
        res.status(200).json({status: SUCCESS, data: {course: course}});
    }
)


module.exports = {
    getAllCourses,
    addCourse,
    getCourse,
    updateCourse,
    deleteCourse,
}