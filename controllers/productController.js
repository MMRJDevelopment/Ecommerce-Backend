const UserList = require("../models/userSchema");

async function secureProductUploadController(req, res, next) {
  const userId = req.headers.authorization.split("@")[1];
  const userPassword = req.headers.authorization.split("@")[2];
  if (!req.headers.authorization) {
    res.json({ error: "authorization not found" });
  } else if (!userId || !userPassword) {
    res.json({ error: "userId or pasword not found" });
  } else {
    const user = await UserList.find({ _id: userId });
    if (user.length > 0) {
      if (user[0].role == "marchant") {
        if (userPassword == "^C5MNs$k4v1mb4") {
          next();
        }
      }
    }
  }
}

function productsController(req, res) {
  res.json({ success: "create products" });
}
module.exports = { productsController, secureProductUploadController };
