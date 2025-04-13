const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.cookies.token;
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).send({
      message: "No token, authorization denied",
    });
  }

  const token = authHeader;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("error in middleware", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
