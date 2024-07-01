const emailValidation = require("../utils/emailValidation");
const UserList = require("./../models/userSchema");
const bcrypt = require("bcrypt");

async function loginController(req, res) {
  const { email, password } = req.body;
  if (!email) {
    return res.json({ error: "email is required" });
  }
  if (emailValidation(email)) {
    return res.json({ error: "email invaled" });
  }
  const existingEmail = await UserList.find({ email });
  if (existingEmail.length > 0) {
    bcrypt.compare(password, existingEmail[0].password).then(function (result) {
      if (result) {
        res.send({
          success: "Login Successful",
          email: existingEmail[0].email,
          role: existingEmail[0].role
        });
      } else {
        res.json({ error: "password is not found" });
      }
    });
  } else {
    res.json({ error: "Email is not found" });
  }
}
module.exports = loginController;
