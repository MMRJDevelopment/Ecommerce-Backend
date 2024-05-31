const express = require("express");
const marchantController = require("../../controllers/marchantController");
const router = express.Router();

router.post("/beCameMarchant", marchantController);
module.exports = router;
