const marchantSchema = require("../models/marchantSchema");
const productSchema = require("../models/productSchema");
const ProductList = require("../models/productSchema");
const UserList = require("../models/userSchema");
const variantList = require("../models/variantSchema");
const marchantController = require("./marchantController");

async function secureProductUploadController(req, res, next) {
  const userId = req.headers.authorization.split("@")[1];
  const userPassword = req.headers.authorization.split("@")[2];
  var Password = "^C5MNs$k4v1mb4";
  if (!req.headers.authorization) {
    res.json({ error: "authorization not found" });
  }
  const user = await UserList.find({ _id: userId });
  if (user.length > 0) {
    if (userPassword == Password) {
      if (user[0].role == "marchant") {
        next();
      } else {
        return res.json({ error: "your not to product uploade" });
      }
    } else {
      return res.json({ error: "Password not matched" });
    }
  } else {
    return res.json({ error: "users not found" });
  }
}

async function productsController(req, res) {
  const { name, description, store, created, update } = req.body;

  const product = new ProductList({
    name,
    description,
    store,
    created,
    update,
  });
  product.save();

  await marchantSchema.findOneAndUpdate(
    { _id: product.store },
    { $push: { product: product._id } },
    { new: true }
  );

  res.json({ success: "create products" });
}
async function createVariant(req, res) {
  const {
    price,
    quantity,
    product,
    created,
    update,
    color,
    ram,
    size,
    storage,
    image,
  } = req.body;

  const variant = new variantList({
    price,
    quantity,
    product,
    created,
    update,
    color,
    ram,
    size,
    storage,
    image: `http://localhost:3000/uploads/${req.file.filename}`,
  });
  variant.save();
  await productSchema.findOneAndUpdate(
    { _id: variant.product },
    { $push: { variants: variant._id } },
    { new: true }
  );
  res.json({ success: "create product variant" });
}
module.exports = {
  productsController,
  secureProductUploadController,
  createVariant,
};
