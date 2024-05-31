const express = require("express");
const router = express.Router();
const registrationController = require("../../controllers/registrationController");
const emailVerifiedController = require("../../controllers/emailVerifiedController");
const loginController = require("../../controllers/loginController");

router.post("/registration", registrationController);
router.post("/emailVerification", emailVerifiedController);
router.post("/login", loginController);

module.exports = router;
