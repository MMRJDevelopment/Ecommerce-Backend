const { disconnect } = require("mongoose");
const marchantSchema = require("../models/marchantSchema");
const productSchema = require("../models/productSchema");
const ProductList = require("../models/productSchema");
const UserList = require("../models/userSchema");
const variantSchema = require("../models/variantSchema");
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
  const {
    name,
    description,
    store,
    created,
    update,
    category,
    subcategory,
    variants,
  } = req.body;

  const product = new ProductList({
    name,
    description,
    store,
    created,
    update,
    category,
    subcategory,
    variants,
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
    // image: `http://localhost:3000/uploads/${req.file.filename}`,
  });
  variant.save();
  await productSchema.findOneAndUpdate(
    { _id: variant.product },
    { $push: { variants: variant._id } },
    { new: true }
  );
  res.json({ success: "create product variant" });
}
async function getAllProducts(req, res) {
  const { category, discount } = req.body;
  const findProduct = await productSchema.find({ category });
  const findVariant = await variantSchema.findById(findProduct[0].variants[2]);

  if (discount.split("%").length == 2) {
    let productPrice =
      Number(findVariant.price) -
      (Number(discount.split("%")[0]) / 100) * Number(findVariant.price);

    const updateVariant = await variantSchema.findByIdAndUpdate(
      findProduct[0].variants[2],
      { price: productPrice }
    );
    res.send("update price %");
  } else {
    let productPrice =
      Number(findVariant.price) - Number(discount.split("%")[0]);
    const updateVariant = await variantSchema.findByIdAndUpdate(
      findProduct[0].variants[2],
      { price: productPrice }
    );
    res.send("update price %");
  }
}

async function nestingProduct(req, res) {
  const product = await productSchema
    .find({ _id: req.body._id })
    .populate({
      path: "variants",
      select: "_id price product",
      populate: {
        path: "product",
        select: "_id name",
      },
    })
    .select("_id name variants");

  res.send(product);
}

async function deleteProduct(req, res) {
  const deleteproduct = await productSchema.findByIdAndDelete(req.body._id);
}

async function getAllProduct(req, res) {
  const data = await productSchema.find({}).populate("store");
  res.send(data);
}

module.exports = {
  productsController,
  secureProductUploadController,
  createVariant,
  getAllProducts,
  nestingProduct,
  getAllProduct,
  deleteProduct,
};
