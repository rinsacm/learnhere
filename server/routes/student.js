const express = require("express");
const router = express.Router();
const dbconfig = require("../config/dbconfig");

router.put("/enroll", (req, res, next) => {
  /*
    body={
        student_email:"",
        course_id:""
    }
    */
  let body = req.body;
  console.log(body);
  dbconfig
    .get()
    .collection("students")
    .updateOne(
      { _id: require("mongodb").ObjectID(body.student_id) },
      { $push: { courses: require("mongodb").ObjectID(body.course_id) } },
      (err, student) => {
        if (err)
          res.status(500).json({
            error: err.toString(),
            success: false,
            message: "Error!!",
          });
        else {
          res.status(200).json({
            success: true,

            message: " Enrollled in a course",
          });
        }
      }
    );
});
router.post("/check-enrolled", (req, res, next) => {
  /*
    body={
        student_email:"",
        course_id:""
    }
    */
  let body = req.body;
  dbconfig
    .get()
    .collection("students")
    .findOne(
      {
        _id: require("mongodb").ObjectID(body.student_id),
        courses: require("mongodb").ObjectID(body.course_id),
      },
      (err, user) => {
        if (err)
          res.status(500).json({
            error: err.toString(),
            success: false,
            message: "Error!!",
          });
        else if (user != null) {
          res.status(200).json({
            success: true,
            enrolled: true,
            message: "Enrolled",
          });
        } else {
          res.status(200).json({
            success: true,
            enrolled: false,
            message: "Not Enrolled",
          });
        }
      }
    );
});

router.get("/:studentid/my-courses", (req, res, next) => {
  let studentid = req.params.studentid;
  console.log(studentid);
  dbconfig
    .get()
    .collection("students")
    .aggregate([
      {
        $match: {
          _id: require("mongodb").ObjectID(studentid),
        },
      },

      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "enrolled_courses",
        },
      },
    ])
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
          courses: data[0].enrolled_courses,
          message: "success",
        });
      }
    });
});

module.exports = router;
