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
async function verificationController(req, res) {
  const { id } = req.params;
  const decoded = jwt.verify(id, "mehebuba");
  console.log(decoded.email);
  if (decoded) {
    const updateUser = await UserList.findOneAndUpdate(
      { email: decoded.email },
      { emailVerified: true },
      { new: true }
    );
    res.redirect("http://localhost:5173/login");
  }

  res.json("verifion done");
}

module.exports = { emailVerifiedController, verificationController };
