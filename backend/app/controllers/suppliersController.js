const suppliersController = {}

const Suppliers = require("../models/Supplier");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken")

//UPDATE
suppliersController.update = (verifyTokenAndAuthorization, async (req, res) => {
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
suppliersController.destroy = (verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deletedProduct = await Suppliers.findByIdAndDelete(req.params.id);
    res.json(deletedProduct)
  } catch (err) {
    res.json(err)
  }
})

//GET USER BY ID
suppliersController.show = (verifyTokenAndAdmin, async (req, res) => {
  try {
    const supp = await Suppliers.findById(req.params.id)
    // .select('-password')
    // console.log(supp)
    const { password, ...others } = supp._doc
    res.json(others)
  } catch (err) {
    res.json(err)
  }
});

//GET ALL USER
suppliersController.list = (verifyTokenAndAdmin, async (req, res) => {
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

module.exports = suppliersController