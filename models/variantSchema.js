const mongoose = require("mongoose");

const variantSchema = mongoose.Schema({
  image: {
    type: String,
    // require: true,
  },
  color: {
    type: String,
  },
  ram: {
    type: String,
  },
  size: {
    type: String,
  },
  storage: {
    type: String,
  },
  price: {
    type: String,
    require: true,
  },
  quantity: {
    type: String,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductList",
    require: true,
  },
  created: {
    type: Date,
    default: new Date(),
  },
  update: {
    type: Date,
  },
});
module.exports = mongoose.model("ProductVariantList", variantSchema);
