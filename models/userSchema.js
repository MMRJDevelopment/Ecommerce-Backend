const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  fastName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telePhone: {
    type: String,
    // required: true,
  },
  addresOne: {
    type: String,
    // required: true,
  },
  addresTow: {
    type: String,
    // required: true,
  },
  city: String,
  postCode: String,
  division: String,
  district: String,
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "users",
    enum: ["users", "admin", "merchant"],
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  token:String,
});
module.exports = mongoose.model("UserList", userSchema);
