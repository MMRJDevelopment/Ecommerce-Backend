const express = require("express");
const dbConnection = require("./config/dbconnection.JS");
const router = require("./routes");
const app = express();
app.use(express.json());

const port = 9000;
dbConnection();
app.use(router);
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
