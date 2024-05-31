const CategoryList = require("../models/categorySchema");
const subCategoryList = require("../models/subCategorySchema");

async function createCategoryController(req, res) {
  const { name, description, isActive, status, created, updated } = req.body;
  const existingCategory = await CategoryList.find({ name });
  if (existingCategory.length > 0) {
    return res.json({ error: "Category Name already used" });
  }
  const category = new CategoryList({
    name,
    description,
  });
  category.save();
  res.json({ success: "create category done" });
}

async function createCategoryStatusController(req, res) {
  const { name, status } = req.body;
  if (status == "rejected" || status == "waiting") {
    const updatedCategoryStatus = await CategoryList.findOneAndUpdate(
      { name },
      { $set: { isActive: false, status: status } },
      { new: true }
    );
    res.json({ success: "Status Update" });
  } else if (status == "approved") {
    const updatedCategoryStatus = await CategoryList.findOneAndUpdate(
      { name },
      { $set: { isActive: true, status: status } },
      { new: true }
    );
    res.json({ success: "Status Update" });
  }
}

async function SubCategoryStatusController(req, res) {
  const { name, status } = req.body;
  if (status == "rejected" || status == "waiting") {
    const updatedCategoryStatus = await subCategoryList.findOneAndUpdate(
      { name },
      { $set: { isActive: false, status: status } },
      { new: true }
    );
    res.json({ success: "Status Update" });
  } else if (status == "approved") {
    const updatedCategoryStatus = await subCategoryList.findOneAndUpdate(
      { name },
      { $set: { isActive: true, status: status } },
      { new: true }
    );
    res.json({ success: "Status Update" });
  }
}

async function createSubCategoryController(req, res) {
  const { name, description, isActive, status, category, created, updated } =
    req.body;
  const existingSubCategory = await subCategoryList.find({ name });
  if (existingSubCategory.length > 0) {
    return res.json({ error: "Sub Category Name already used" });
  }
  const subCategory = new subCategoryList({
    name,
    description,
    category,
  });
  subCategory.save();
  await CategoryList.findOneAndUpdate(
    { _id: subCategory.category },
    { $push: { subCategory: subCategory._id } },
    { new: true }
  );
  res.json({ success: "create sub Category done" });
}

async function getAllCategoryController(req, res) {
  const category = await CategoryList.find({});
  res.send(category);
}

async function getAllSubCategoryController(req, res) {
  const category = await subCategoryList.find({}).populate("subCategory");
  res.send(category);
}
module.exports = {
  createCategoryController,
  createSubCategoryController,
  createCategoryStatusController,
  SubCategoryStatusController,
  getAllCategoryController,
  getAllSubCategoryController,
};
