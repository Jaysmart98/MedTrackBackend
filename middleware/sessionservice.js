// const jwt = require("jsonwebtoken")
// const {userModel} = require("../model/user.model")


// const Authtoken = async (req, res, next) => {
//     try{
//        const token = req.headers.authorization.split(" ")[1]
//         if (!token) {
//             return res.status(400).json({message:"Invalid token"})
//         }
//         const verifiedtoken = await jwt.verify(token, process.env.JWT_SECRETKEY)
//         if (verifiedtoken) {
//             const user = await userModel.findOne({email:verifiedtoken.email})
//             if (!user) {
//             return res.status(400).json({message:"Invalid user", status: false})
//         }
//           req.user = user
//          return next()

//         }

//         return res.status(400).json({message:"jwt malformed", status : false})
//     } catch (error) {
//         return res.status(500).json({message:error.message, status:false})
//     }
// }

// module.exports = Authtoken


const jwt = require("jsonwebtoken");

const Authtoken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided", status: false });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = decoded; // This adds user ID and email to the request object
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token", status: false });
    }
};

module.exports = Authtoken;