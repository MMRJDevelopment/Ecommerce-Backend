const discountSchema = require("../models/discountSchema");

function discountController(req, res) {
  const { cash, percent, flat, category, subCategory, product } = req.body;
  const discount = new discountSchema({
    cash,
    percent,
    flat,
    category,
    subCategory,
    product,
  });
  discount.save();
   res.json({succes:"Discount create successfull"});
}

async function getDiscountController(req,res){
    const discount = await discountSchema.find({}).populate(["product","category","subCategory"])
    res.send(discount)
}

module.exports = { discountController, getDiscountController };
