const express = require('express')
const router = express.Router() 

const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  authenticateUser
} = require("./verifyToken")

// CREATE
router.post("/:productId", authenticateUser, async (req, res) => {
    const productId = req.params.productId
    const newCart = new Cart({...req.body, productId : productId})
    try {
      const savedCart = await newCart.save()
      if( savedCart ){
        Cart.findById( savedCart._id )
          .populate('userId','-password')
          .populate('productId')
          .exec(function(err,data) {
              if( err ){
                  res.json(data)
              }else{
                  res.json(data)
              }
            })
      }
      // res.json(savedCart)
    } catch(err) {
      res.json(err)
    }

})

//UPDATE
router.put("/:id", authenticateUser, async (req, res) => {

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.json(updatedCart)
  } catch (err) {
    res.json(err)
  }
})

// DELETE
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json("THIS CART HAS BEEN DELETED")
  } catch (err) {
    res.json(err)
  }
})

//GET USER CART BY ID
router.get("/:userId", authenticateUser, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.params.id})
    res.json(cart)
  } catch (err) {
    res.json(err)
  }
});

//GET ALL
router.get("/", authenticateUser, async (req, res) => {
    Cart.find()
        .then((cartItems) => {
            res.json(cartItems)
        })
        .catch((err) => {
            res.json(err)
        })
})

module.exports = router