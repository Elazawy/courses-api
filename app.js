const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('MongoDB Connected!');
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Server listen on port ${process.env.PORT || 4000}`);
        })
    })

