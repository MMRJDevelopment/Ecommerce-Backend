const mongoose = require("mongoose");
function dbConnection() {
  mongoose
    .connect(
      "mongodb+srv://mahi1971kvs:mehebuba@cluster0.ce9ajff.mongodb.net/orebi?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Connected!"));
}
module.exports = dbConnection;
