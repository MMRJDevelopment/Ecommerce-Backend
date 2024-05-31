const express = require("express");
const {
  productsController,
  secureProductUploadController,
} = require("../../controllers/productController");
const router = express.Router();

router.post(
  "/createProduct",
  secureProductUploadController,
  productsController
);

module.exports = router;
