const jwt = require("jsonwebtoken");
require("dotenv").config()

// auth 
exports.auth = async (req, res, next) => {
        try {
                const token = req.body.token
                        || req.cookies.token
                        || req.header("Authorization").replace("Bearer ", "")

                if (!token) {
                        return res.status(401).json({
                                message: "Invalid token",
                                success: false
                        })
                }
                try {
                        // decode the token using verify method
                        const decode = jwt.verify(token, process.env.JWT_SECRET);
                        req.user = decode;
                        next();
                } catch (error) {
                        console.log(error);
                        res.status(401).json({
                                
                                 message: "Invalid token", success: false })

                }


        } catch (error) {
                console.log(error);
                return res.status(401).json({ message: "Invalid token", success: false });

        }

}


// isStudent 

exports.isStudent = async (req, res, next) => {
        try {
                if (req.user.accountType !== "Student") {
                        return res.status(401).json({ message: "unauthorized", success: false })
                }
                next();
        } catch (error) {
                console.log(error);
                return res.status(401).json({ message: "unauthorized", success: false })
        }
}



// is instructor 
exports.isInstructor = async (req, res, next) => {
        try {
                if (req.user.accountType !== "Instructor") {
                        return res.status(401).json({ message: "unauthorized", success: false })
                }
                next();
        } catch (error) {
                console.log(error);
                return res.status(401).json({ message: "unauthorized", success: false })
        }
}


// is Admin 

exports.isAdmin = async (req, res, next) => {
        try {
                if (req.user.accountType !== "Admin") {
                        return res.status(401).json({ message: "unauthorized", success: false })
                }
                next();
        } catch (error) {
                console.log(error);
                return res.status(401).json({ message: "unauthorized", success: false })
        }
}