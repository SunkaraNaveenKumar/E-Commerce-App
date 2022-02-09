const productController = {}

const Product = require("../models/Product");
const {
  verifyTokenAndAdmin,
  authenticateUser,
} = require("../middlewares/verifyToken")

// CREATE
productController.create = (verifyTokenAndAdmin, async (req, res) => {
    const supplierId = req.params.supplierId
    const newProd = new Product({...req.body,supplierId : supplierId})
    try {
        const savedProd = await newProd.save()
        res.json(savedProd)
    } catch(err) {
        res.json(err)
    }
})

//UPDATE
productController.update = (verifyTokenAndAdmin , async (req, res) => {

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.json(updatedProduct)
  } catch (err) {
    res.json(err)
  }
})

// DELETE
productController.destroy = (verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.json(deletedProduct)
  } catch (err) {
    res.json(err)
  }
})

//GET PRODUCT BY ID
productController.show = (authenticateUser, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (err) {
    res.json(err)
  }
});

//GET ALL PRODUCTS
productController.list = (authenticateUser, async (req, res) => {
  const query = req.query.new
  try {
    const products = query
      ? await Product.find().sort({ _id: -1 }).limit(5)
      : await Product.find();
    res.json(products)
  } catch (err) {
    res.json(err)
  }
})

module.exports = productController