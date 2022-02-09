const express = require('express')
const router = express.Router() 

const User = require("../models/Users");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  authenticateUser
} = require("./verifyToken")

//UPDATE
router.put("/:id", authenticateUser, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_WORD).toString()
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.json(updatedUser)
  } catch (err) {
    res.json(err)
  }
})

//DELETE
router.delete("/:id", authenticateUser,  async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json("User has been deleted...")
  } catch (err) {
    res.json(err)
  }
})

//GET USER BY ID
router.get("/:id", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc
    res.json(others)
  } catch (err) {
    res.json(err)
  }
});

//GET ALL USER
router.get("/", authenticateUser, async (req, res) => {
  const query = req.query.new
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.json(users)
  } catch (err) {
    res.json(err)
  }
})

module.exports = router