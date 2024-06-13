const express = require("express");
var cors = require("cors");
const dbConnection = require("./config/dbconnection.JS");
const router = require("./routes");
const app = express();

const port = 9000;
dbConnection();
app.use(cors());
app.use(express.json());
app.use(router);
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
