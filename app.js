const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const coursesRouter = require('./routes/courses.route');
const userRouter = require('./routes/users.route');
const {ERROR} = require("./utils/httpStatusText");
const cors = require('cors');

const app = express();

mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('MongoDB Connected!');
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Server listen on port ${process.env.PORT || 4000}`);
        })
    })

app.use(cors());
app.use(express.json());


// Routes
app.use('/api/courses', coursesRouter);
app.use('/api/users', userRouter);

// Global middleware for not found routes
app.use((req,res,next) => {
    if(!req.route){
        res.status(404).json({
            status: ERROR,
            message: 'Not Found'
        });
    }
    next();
})
// Global error handler
app.use((error,req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || ERROR,
        message: error.message || "Internal Server Error",
        code: error.statusCode || 500,
        data: null
    });
})