const jwt = require("jsonwebtoken")
require("dotenv").config();
 

// auth
exports.auth = async (req, res, next) => {
    try {
        // Extract Token
        const token = req.cookies.token || req.body.token || req.header("authorization")?.replace("Bearer ", "");
        // if token is missing
        console.log("token is in auth::",token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is Missing"
            });
        }
        // verify the token
        console.log("Going to do decode");
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET)//decode conatin payload
            console.log(decode);
            req.user = decode
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
                error:error.message
            });
        }
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "something went wrong while validating the token"
        })
    }
}

// ++++++++++++++++++++++++++++isStudent+++++++++++++++++++++++++++++++++++++++++++


exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for student only"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role cannot verified please try again"
        });
    }
}

// +++++++++++++++++=IsInstructor+++++++++++++++++++++++++++++++

exports.isCompany = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Company") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Company only"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role cannot verified please try again"
        });
    }
}

// ++++++++++++++++++isAdmin++++++++++++++++++


exports.isTPR = async (req, res, next) => {
    try {
        if (req.user.accountType !== "TPR") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for TPR only"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role cannot verified please try again"
        });
    }
}



 