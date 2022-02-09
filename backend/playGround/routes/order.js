const express = require('express')
const router = express.Router() 

const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  authenticateUser
} = require("./verifyToken")

// CREATE
router.post("/:cartId", authenticateUser, async (req, res) => {
    const cartId = req.params.cartId
    const newOrder = new Order({...req.body, cartId : cartId})
    try {
        const savedOrder = await newOrder.save()
        res.json(savedOrder)
    } catch(err) {
        res.json(err)
    }
})

//UPDATE
router.put("/:id", authenticateUser , async (req, res) => {

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.json(updatedOrder)
  } catch (err) {
    res.json(err)
  }
})

// DELETE
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json("YOUR ORDER HAS BEEN DELETED")
  } catch (err) {
    res.json(err)
  }
})

//GET USER ORDERS
router.get("/:id", authenticateUser, async (req, res) => {
  try {
    const order = await Order.find(req.params.id)
    res.json(order)
  } catch (err) {
    res.json(err)
  }
});

//GET ALL ORDERS
router.get("/", authenticateUser, async (req, res) => {
    Order.find()
        .then((orders) => {
            res.json(orders)
        })
        .catch((err)=>{
            res.json(err)
        })
    })

module.exports = router