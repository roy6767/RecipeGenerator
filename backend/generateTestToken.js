const jwt = require("jsonwebtoken");

const payload = {
  id: 1,
  username: "testuser",
};
const secret = process.env.ACCESS_TOKEN;

const token = jwt.sign(payload, secret, { expiresIn: "1h" });

console.log("Generated Test Token:", token);
