const dotenv = require("dotenv");
dotenv.config();
const { connect } = require("mongoose");

async function dbConnection() {
  try {
    await connect(process.env.DATABASE_URI);
    console.log("Database connection successfully");
  } catch (err) {
    console.log("fail to connect db");
    console.error(err);
  }
}

module.exports = dbConnection;
