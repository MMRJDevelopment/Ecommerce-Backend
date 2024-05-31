const emailTemplate = require("../utils/emailTemplate");
const emailValidation = require("../utils/emailValidation");
const sendEmail = require("../utils/sendEmail");
const UserList = require("./../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registration(req, res) {
  const {
    fastName,
    lastName,
    email,
    telePhone,
    addresOne,
    addresTow,
    city,
    postCode,
    division,
    district,
    password,
  } = req.body;
  if (!fastName || !lastName) {
    return res.json({ error: "FastName or last Name is required" });
  }
  if (!email) {
    return res.json({ error: "email is required" });
  }
  if (emailValidation(email)) {
    return res.json({ error: "email invaled" });
  }
  const existingEmail = await UserList.find({ email });
  if (existingEmail.length > 0) {
    return res.json({ error: "Email already used" });
  }
  bcrypt.hash(password, 10, function (err, hash) {
    const users = UserList({
      fastName,
      lastName,
      email,
      telePhone,
      addresOne,
      addresTow,
      city,
      postCode,
      division,
      district,
      password: hash,
    });
    users.save();
    const token = jwt.sign({ email }, "mehebuba");

    sendEmail(email, "ecommerce", emailTemplate(token));
    res.json(users);
  });
}
module.exports = registration;
