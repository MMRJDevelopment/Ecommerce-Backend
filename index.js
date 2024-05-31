const express = require("express");
const dbConnection = require("./config/dbconnection.JS");
const router = require("./routes");
const app = express();
app.use(express.json());

const port = 9000;
dbConnection();
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
