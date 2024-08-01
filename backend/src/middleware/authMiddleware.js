const jwt = require("jsonwebtoken");

const jwt_Secret =
  "d3c7d4954e34fdd681b934948ebc5693430ff7acbe085d5b62a62488ac754003";

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, jwt_Secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
