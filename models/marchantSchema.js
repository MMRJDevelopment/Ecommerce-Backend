const mongoose = require("mongoose");
const storeSchema = mongoose.Schema({
  storename: {
    type: String,
    require: true,
  },
  officialemail: {
    type: String,
    require,
  },
  officialphone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserList",
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductList",
    },
  ],
  creted: {
    type: Date,
    default: new Date(),
  },
  update: {
    type: Date,
  },
});
module.exports = mongoose.model("StoresList", storeSchema);
