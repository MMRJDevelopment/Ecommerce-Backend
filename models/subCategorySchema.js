const mongoose = require("mongoose");
const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "waiting",
    enum: ["approved", "rejected", "waiting"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryList",
  },
  created: {
    type: String,
    default: new Date(),
  },
  updated: {
    type: Date,
  },
});
module.exports = mongoose.model("SubCategoryList", subCategorySchema);
