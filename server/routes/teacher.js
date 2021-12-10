const express = require("express");
const bcrypt = require("bcrypt");
const dbconfig = require("../config/dbconfig");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);
  let newUser = {
    name: req.body.name,
    email: req.body.email,
    job: req.body.job,
    company: req.body.company,
    skills: req.body.skills,
    password: hashedPassword,
  };
  dbconfig
    .get()
    .collection("teachers")
    .findOne({ email: newUser.email }, (err, user) => {
      if (user)
        res.status(500).json({
          success: false,
          message: "User Exists",
        });
      else
        dbconfig
          .get()
          .collection("teachers")
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
                message: "New user created",
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
    .collection("teachers")
    .findOne({ email: email }, (err, user) => {
      if (user) {
        console.log(user);
        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign(email, process.env.TOKEN_SECRET);
          console.log(user._id);
          res.status(200).json({
            success: true,
            user: user._id,
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
router.post("/create-new-course", (req, res) => {
  console.log(req.body);
  let course = req.body;
  dbconfig
    .get()
    .collection("courses")
    .insertOne(course, (err, data) => {
      if (err)
        res.status(500).json({
          error: err.toString(),
          success: false,
          message: "Error!!",
        });
      else {
        res.status(201).json({
          success: true,

          message: "Course created",
        });
      }
    });
});
router.get("/courses", (req, res) => {
  dbconfig
    .get()
    .collection("courses")
    .find()
    .toArray((err, data) => {
      console.log(data);
      if (err)
        res.status(500).json({
          error: err.toString(),
          success: false,
          message: "Error!!",
        });
      else {
        res.status(200).json({
          success: true,
          courses: data,
          message: "success",
        });
      }
    });
});

module.exports = router;
