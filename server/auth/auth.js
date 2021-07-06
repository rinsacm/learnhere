const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  let authHeader = req.header("Authorization");
  let token = authHeader.split(" ")[1];
  console.log(token);
  if (token == null)
    res.status(401).json({
      message: "Not Logged in",
    });
  else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "Error in authentication",
        });
      } else {
        console.log(decoded);
        req.user = decoded;
        next();
      }
    });
  }
}
module.exports = authenticateToken;
