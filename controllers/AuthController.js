const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  if (req.body.password != req.body.confirm_password) {
    return res.json({
      message: "Please enter same password..!",
    });
  }
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    let token = jwt.sign(
      { name: req.body.name, email: req.body.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPass,
      token: token,
    });
    user
      .save()
      .then((response) => {
        res.json({
          message: "Registered successfully..!",
          token: response.token,
        });
      })
      .catch((error) => {
        res.json({
          message: error,
        });
      });
  });
};

const login = async (req, res, next) => {
  await User.findOne(req.body.email)
    .then((user) => {
      const checkUser = bcrypt.compare(req.body.password, user.password);
      if (checkUser) {
        token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.json({
          message: "Logged in successfully..!",
          token: token,
        });
      }
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
};

module.exports = {
  register,
  login,
};
