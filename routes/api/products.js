const express = require("express");
const {
  productsController,
  secureProductUploadController,
  createVariant,
} = require("../../controllers/productController");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        `.${file.originalname.split(".")[1]}`
    );
  },
});

const upload = multer({ storage: storage });

router.post(
  "/createProduct",
  secureProductUploadController,
  productsController
);
router.post("/createVariant", upload.single("image"), createVariant);

module.exports = router;
