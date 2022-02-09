const express = require('express')
const router = express.Router() 

const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken")

// CREATE
router.post("/:supplierId", verifyTokenAndAdmin, async (req, res) => {
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
router.put("/:id", verifyTokenAndAdmin , async (req, res) => {

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
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json("THIS PRODUCT HAS BEEN DELETED")
  } catch (err) {
    res.json(err)
  }
})

//GET PRODUCT BY ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (err) {
    res.json(err)
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
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

module.exports = router