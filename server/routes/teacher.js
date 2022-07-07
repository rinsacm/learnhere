const express = require("express");
const bcrypt = require("bcrypt");
const dbconfig = require("../config/dbconfig");
const jwt = require("jsonwebtoken");
const router = express.Router();
const fs = require("fs");
const { MongoClient, GridFSBucket } = require("mongodb");
let mongodb = require("mongodb");
const Grid = require("gridfs-stream");
const mult = require("../config/video_upload");
let gfs;

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
            token: token,
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
router.post("/courses/:courseid/new-module", (req, res, next) => {
  console.log(req.body);
  let module = req.body.module;
  let courseid = req.params.courseid;
  dbconfig
    .get()
    .collection("courses")
    .updateOne(
      { _id: require("mongodb").ObjectID(courseid) },
      { $push: { modules: { moduleName: module } } },
      (err, data) => {
        if (err)
          res.status(500).json({
            error: err.toString(),
            success: false,
            message: "Error!!",
          });
        else {
          res.status(201).json({
            success: true,

            message: "Module created",
          });
        }
      }
    );
});

router.get("/courses/:courseid", (req, res) => {
  let courseid = req.params.courseid;
  dbconfig
    .get()
    .collection("courses")
    .findOne({ _id: require("mongodb").ObjectID(courseid) }, (err, data) => {
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

          data: data,
        });
      }
    });
});

router.post(
  "/courses/:courseid/:module/upload-video",
  mult.upload.single("file"),
  async (req, res, next) => {
    console.log("kkkkkkk");

    console.log(req.file.filename);
    // console.log(req.file.getAsBinary());
    var filename = __dirname + req.url;
    console.log(filename);
    // console.log(req);
    console.log("Uploading video...");

    // const bucket = new GridFSBucket(db);

    // // create upload stream using GridFS bucket
    // const videoUploadStream = bucket.openUploadStream(req.file.name);
    // console.log(videoUploadStream, "\n\n");
    // const videoReadStream = fs.createReadStream(filename);
    // console.log(videoReadStream, "\n\n");

    // // Finally Upload!
    // videoReadStream.pipe(videoUploadStream);

    // All done!
    res.status(200).json({
      message: "Done...",
      data: {
        file: req.file.filename,
      },
    });
  }
);
router.get(
  "/courses/:courseid/:module/video/:filename",
  async (req, res, next) => {
    // let gfs = await dbconnect.get().collection("uploads");
    // let gfs_f = dbconnect.get().collection("uploads.files");
    // console.log(gfs_f);
    // console.log(gfs);
    // console.log(gfs.files);
    gfsBucket = new GridFSBucket(dbconfig.get(), {
      chunkSizeBytes: 4000,
      bucketName: "uploads",
    });
    // gfs = Grid(dbconnect.get(), mongodb);
    console.log(gfsBucket);

    dbconfig
      .get()
      .collection("uploads.files")
      .findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0)
          return res.status(404).json({ err: "No file exists" });
        console.log(file);
        const readstream = gfsBucket.openDownloadStreamByName(file.filename);
        readstream.pipe(res);
      });
  }
);
router.put("/courses/:courseid", (req, res, next) => {
  let { videoName, moduleName } = req.body;
  let courseid = req.params.courseid;
  console.log(courseid);
  console.log(videoName);
  console.log(moduleName);
  console.log({
    _id: require("mongodb").ObjectID(courseid),
    "modules.moduleName": moduleName,
  });
  dbconfig
    .get()
    .collection("courses")
    .updateOne(
      {
        _id: require("mongodb").ObjectID(courseid),
        "modules.moduleName": moduleName,
      },
      {
        $set: {
          "modules.$.video": videoName,
        },
      },
      { upsert: true },
      (err, data) => {
        if (err) {
          res.status(500).json({
            message: "error",
            data: {
              success: false,
            },
          });
        } else {
          res.status(200).json({
            message: "updated course details",
            data: {
              success: true,
            },
          });
        }
        console.log(data);
        console.log(err);
      }
    );
});

module.exports = router;
