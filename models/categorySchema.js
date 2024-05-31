const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
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
  created: {
    type: String,
    default: new Date(),
  },
  updated: {
    type: Date,
  },
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategoryList",
    },
  ],
});
module.exports = mongoose.model("CategoryList", categorySchema);
