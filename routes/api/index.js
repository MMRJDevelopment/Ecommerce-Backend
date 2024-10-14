const express = require("express");
const router = express.Router();
const authRouter = require("./authentication");
const categoryRouter = require("./category");
const marchantRouter = require("./marchant");
const productRouter = require("./products");
const discountRouter = require("./discount");

router.use("/authentication", authRouter);
router.use("/category", categoryRouter);
router.use("/marchant", marchantRouter);
router.use("/product", productRouter);
router.use("/discount", discountRouter);
module.exports = router;
