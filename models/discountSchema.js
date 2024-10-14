const mongoose = require("mongoose");
const discountSchema = mongoose.Schema({
  cash: {
    type: Number,
  },
  percent: {
    type: Number,
  },
  flat: {
    type: Boolean,
    default: false,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductList",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryList",
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategoryList",
  },
  creted: {
    type: Date,
    default: new Date(),
  },
  update: {
    type: Date,
  }
});
module.exports = mongoose.model("Discount", discountSchema);
