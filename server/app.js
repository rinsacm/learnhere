const express = require("express");
const app = express();
const cors = require("cors");
let indexRouter = require("./index");
let dbconnect = require("./config/dbconfig");

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let corsOptins = {
  origin: "*",
  crossOrigin: true,
  credentials: true,
};
app.use(cors(corsOptins));
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(allowCrossDomain);

app.use("/", indexRouter);

app.listen(process.env.PORT, () => {
  console.log("listening at port ", process.env.PORT);
});

dbconnect.connect((err) => {
  if (err) {
    console.log("Unable to connect to database");
    process.exit(1);
  }
});
