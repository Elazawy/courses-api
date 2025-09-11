const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const {ERROR} = require("../utils/httpStatusText");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader){
        const error = appError.create(401, "Token is required", ERROR);
        next(error);
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        const error = appError.create(401, "Invalid token", ERROR);
        next(error);
    }
}

module.exports = verifyToken;