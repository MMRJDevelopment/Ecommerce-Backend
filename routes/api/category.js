const express = require("express");
const {
  createCategoryController,
  createSubCategoryController,
  createCategoryStatusController,
  SubCategoryStatusController,
  getAllCategoryController,
  getAllSubCategoryController,
} = require("../../controllers/categoryController");
const router = express.Router();

router.post("/createCategory", createCategoryController);
router.post("/subCreateCategory", createSubCategoryController);
router.post("/createCategoryStatus", createCategoryStatusController);
router.post("/subCategoryStatus", SubCategoryStatusController);

router.get("/getAllCategory", getAllCategoryController);
router.get("/getAllSubCategory", getAllSubCategoryController);
module.exports = router;
