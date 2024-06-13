const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoresList",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryList",
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategoryList",
  },
  variants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariantList",
    },
  ],
  created: {
    type: Date,
    default: new Date(),
  },
  update: {
    type: Date,
  },
});
module.exports = mongoose.model("ProductList", productSchema);
