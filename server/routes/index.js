const { ObjectId } = require("bson");
const express = require("express");
const router = express.Router();
const dbconfig = require("../config/dbconfig");

router.get("/hi", (req, res, next) => {
  console.log("hiiiiii");
  return res.status(200).json({
    success: true,
  });
});
router.get("/get-role/:id", (req, res, next) => {
  let id = req.params.id;
  dbconfig
    .get()
    .collection("students")
    .findOne({ _id: new ObjectId(id) }, (err, user) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "some error occurred",
        });
      } else if (user) {
        return res.status(200).json({
          success: true,
          role: "student",
        });
      } else {
        dbconfig
          .get()
          .collection("teachers")
          .findOne({ _id: new ObjectId(id) }, (err, user) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "some error occurred",
              });
            } else if (user) {
              return res.status(200).json({
                success: true,
                role: "teacher",
              });
            } else {
              return res.status(404).json({
                success: true,
                role: null,
              });
            }
          });
      }
    });
});
router.get("/test", (req, res, next) => {
  console.log("running");
  res.end("running....");
});
module.exports = router;
