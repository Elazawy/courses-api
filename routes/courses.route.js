const router = require('express').Router();
const { body } = require('express-validator');
const courseController = require('../controllers/courses.controller');

router.route('/')
    .get(courseController.getAllCourses)
    .post([
        body('name')
            .notEmpty()
            .withMessage('Title is required'),
        body('price')
            .notEmpty()
            .withMessage('Price is required'),
        ],
        courseController.addCourse
    )

router.route('/:courseId')
    .get(courseController.getCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse);

module.exports = router;