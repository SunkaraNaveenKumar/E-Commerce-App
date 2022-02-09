const cartController = {}

const Cart = require("../models/Cart");
const {
  authenticateUser,
} = require("../middlewares/verifyToken")

// CREATE
cartController.create = (authenticateUser, async (req, res) => {
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
cartController.update = (authenticateUser, async (req, res) => {

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
cartController.destroy = (authenticateUser, async (req, res) => {
  try {
    const deleteCartItem = await Cart.findByIdAndDelete(req.params.id);
    res.json(deleteCartItem)
  } catch (err) {
    res.json(err)
  }
})

//GET USER CART BY ID
cartController.show = (authenticateUser, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.params.id})
    res.json(cart)
  } catch (err) {
    res.json(err)
  }
});

//GET ALL
cartController.list = (authenticateUser, async (req, res) => {
    Cart.find()
      .populate('userId','-password')
      .populate('productId')
      .exec(function(err,data) {
          if( err ){
              res.json(data)
          }else{
              res.json(data)
          }
        })
})

cartController.deleteAll = (async (req, res) => {
  try {
    const deleteCartItem = await Cart.deleteMany({})
    res.json(deleteCartItem)
  } catch (err) {
    res.json(err)
  }
})

module.exports = cartController