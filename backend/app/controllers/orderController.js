const orderController = {}

const Order = require("../models/Order");
const {
  authenticateUser
} = require("../middlewares/verifyToken")

// CREATE
orderController.create = (authenticateUser, async (req, res) => {
    const cartId = req.params.cartId
    const newOrder = new Order({...req.body, cartId : cartId})
    try {
        const savedOrder = await newOrder.save()
        if( savedOrder._id ){
          Order.findById( savedOrder._id )
            .populate('cartId')
            .exec(function(err,data) {
                if( err ){
                    res.json(data)
                }else{
                    res.json(data)
                }
              })
        }
        // res.json(savedOrder)
    } catch(err) {
        res.json(err)
    }
})

//UPDATE
orderController.update = (authenticateUser , async (req, res) => {

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
orderController.destroy = (authenticateUser, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json("YOUR ORDER HAS BEEN DELETED")
  } catch (err) {
    res.json(err)
  }
})

//GET USER ORDERS
orderController.list = (authenticateUser, async (req, res) => {
  try {
    const order = await Order.find(req.params.id)
    res.json(order)
  } catch (err) {
    res.json(err)
  }
});

//GET ALL ORDERS
orderController.show = (authenticateUser, async (req, res) => {
    Order.find()
        .then((orders) => {
            res.json(orders)
        })
        .catch((err)=>{
            res.json(err)
        })
    })

module.exports = orderController