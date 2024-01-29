const express = require("express");
const bcrypt = require("bcrypt");
const dbconfig = require("../config/dbconfig");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("bson");
const router = express.Router();

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);
  let newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
  };
  dbconfig
    .get()
    .collection("students")
    .findOne({ email: newUser.email }, (err, user) => {
      if (user)
        res.status(500).json({
          success: false,
          message: "Student  Exists",
        });
      else
        dbconfig
          .get()
          .collection("students")
          .insertOne(newUser, (err, user) => {
            if (err)
              res.status(500).json({
                error: err.toString(),
                success: false,
                message: "Error!!",
              });
            else {
              console.log(user.ops[0]._id);
              res.status(201).json({
                success: true,
                user: user.ops[0]._id,
                message: "New student user created",
              });
            }
          });
    });
});
router.post("/login", (req, res, next) => {
  let { email, password } = req.body;
  console.log(req.body);
  dbconfig
    .get()
    .collection("students")
    .findOne({ email: email }, (err, user) => {
      if (user) {
        console.log(user);
        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign(email, process.env.TOKEN_SECRET);
          console.log(user._id);
          res.status(200).json({
            success: true,
            user: user._id,
            name: user.firstname + " " + user.lastname,
            message: "Logged in",
          });
        } else {
          res.status(500).json({
            success: false,
            message: "Incorrect password",
          });
        }
      } else {
        console.log(err);
        res.status(404).json({
          success: false,
          message: "Incorrect email",
        });
      }
    });
});

module.exports = router;
