const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.model");

const Authtoken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
        status: false
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
        status: false
      });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      status: false
    });
  }
};

module.exports = Authtoken;
