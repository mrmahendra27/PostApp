const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const index = async (req, res, next) => {
  await User.find()
    .populate("posts")
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => res.json({ error }));
};

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

    let user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPass,
    });
    user
      .save()
      .then((user) => {
        let token = jwt.sign(
          { id: user.id, name: req.body.name, email: req.body.email },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        user.token = token;
        user.save();

        res.json({
          message: "Registered successfully..!",
          token,
        });
      })
      .catch((error) => {
        console.log(error);
        res.json({
          message: error,
        });
      });
  });
};

const login = (req, res, next) => {
  User.findOne({ email: req.body.username })
    .then((user) => {
      const checkUser = bcrypt.compare(
        req.body.password,
        user.password,
        (err, result) => {
          if (result) {
            token = jwt.sign(
              { id: user.id, name: user.name, email: user.email },
              process.env.SECRET_KEY,
              { expiresIn: "1h" }
            );
            user.token = token;
            user.save();
            res.json({
              message: "Logged in successfully..!",
              token,
            });
          } else {
            res.json({
              message: "Wrong Credentails.!",
            });
          }
        }
      );
    })
    .catch((error) => {
      console.log(error);
      res.json({
        message: "No users found.!",
      });
    });
};

module.exports = {
  index,
  register,
  login,
};
