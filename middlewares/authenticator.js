const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

exports.authenticateJwt = (req, res, next) => {
  //   const token = req.cookies.token;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Authorization denied");
  }

  const decode = jwt.verify(token, jwtSecret);

  if(!decode) {
    res.status(401);
    throw new Error("Authorization denied");
  }

  req.user = decode.user;
  next();
};
