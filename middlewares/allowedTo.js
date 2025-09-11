const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const {ERROR} = require("../utils/httpStatusText");

module.exports = (...roles) => {
    return (req, res, next) => {
        const userRole = req.userRole;
        if (!roles.includes(userRole)) {
            return next(appError.create(401, ERROR ,"Not allowed"));
        }
        next();
    }
}