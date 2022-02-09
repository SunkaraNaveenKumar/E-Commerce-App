const express = require('express')
const router = express.Router() 

const Suppliers = require("../models/Supplier");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken")

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SUPP).toString()
  }

  try {
    const updatedSupplier = await Suppliers.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.json(updatedSupplier)
  } catch (err) {
    res.json(err)
  }
})

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Suppliers.findByIdAndDelete(req.params.id);
    res.json("Supplier has been deleted...")
  } catch (err) {
    res.json(err)
  }
})

//GET SUPPLIER BY ID
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const supp = await Suppliers.findById(req.params.id)
    const { password, ...others } = supp._doc
    res.json(others)
  } catch (err) {
    res.json(err)
  }
});

//GET ALL SUPPLIERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new
  try {
    const suppliers = query
      ? await Suppliers.find().sort({ _id: -1 }).limit(5)
      : await Suppliers.find();
    res.json(suppliers)
  } catch (err) {
    res.json(err)
  }
})

module.exports = router