const jwt = require("jsonwebtoken");
const UserList = require("./../models/userSchema");
async function emailVerifiedController(req, res) {
  console.log(req.headers.authorization);
  const { authorization } = req.headers;
  const decoded = jwt.verify(authorization, "mehebuba");
  console.log(decoded.email);
  const updateUser = await UserList.findOneAndUpdate(
    { email: decoded.email },
    { emailVerified: true },
    { new: true }
  );
  res.json({ success: "Email verification successfuly done" });
}
module.exports = emailVerifiedController;
