const User = require('../models/user.model');
const asyncWrapper = require('../middlewares/asyncWrapper');
const {SUCCESS, FAIL} = require("../utils/httpStatusText");
const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const bcrypt = require("bcrypt");

const getAllUsers = asyncWrapper (
    async (req, res, next) => {
        const users = await User.find();
        res.status(200).json({status: SUCCESS, data: {users : users}});
    }
)

const register = asyncWrapper(
    async (req, res, next) => {
        const oldUser = await User.findOne({email : req.body.email});
        if(oldUser){
            const error = appError.create(400, FAIL, "User already exists");
            return next(error);
        }
        const {firstName, lastName, email, password, role} = req.body;
        const image = req.file.filename;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await new User({
            firstName,
            lastName,
            email,
            role,
            image,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({status: SUCCESS, data: newUser});
}
)

const login = asyncWrapper(
    async (req, res, next) => {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isCorrectPassword = user ? await bcrypt.compare(password, user.password) : false;
        if(!user || !isCorrectPassword){
            const error = appError.create(400, FAIL, "Invalid email or password");
        }
        const token = jwt.sign({
                email: user.email, id: user._id, role: user.role},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "7d"});
        res.status(200).json({status: SUCCESS, data: {token: token}});
    }
)

module.exports = {
    getAllUsers,
    register,
    login
}