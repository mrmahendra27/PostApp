const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    await User.findById(decode.id)
      .then((response) => {
        if (response.token != token) {
          res.json({
            message: "Session expired",
          });
        }
        req.user = response;
        next();
      })
      .catch((err) => {
        res.json({
          message: "User not found..!",
        });
      });
  } catch (error) {
    res.json({
      message: "Authentication failed",
    });
  }
};

module.exports = authenticate;
