const express = require("express");
const {
  marchantController,
  getallstoreController,
} = require("../../controllers/marchantController");
const router = express.Router();

router.post("/beCameMarchant", marchantController);
router.get("/getallstore", getallstoreController);
module.exports = router;
