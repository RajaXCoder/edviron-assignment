const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Access Denied");
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.PG_KEY);
    if (verified) {
      next();
    }
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = authMiddleware;
