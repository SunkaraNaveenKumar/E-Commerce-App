const router = require("express").Router()
const User = require("../models/Users")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    age: req.body.age,
    gender: req.body.gender,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_WORD).toString()
  })

  try {
    const savedUser = await newUser.save()
    res.json(savedUser)
  } catch (err) {
    console.log(err)
    res.json(err)
  }

})

// LOGIN
  router.post('/login', async (req, res) => {
      try{
          const user = await User.findOne(
              {
                  username: req.body.username
              }
          )

          !user && res.json("WRONG USERNAME!!!")

          const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_WORD)


          const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

          const inputPassword = req.body.password
          
          originalPassword != inputPassword && res.json("WRONG PASSWORD!!!")

          const accessToken = jwt.sign(
          {
              id: user._id,
              isAdmin: user.isAdmin,
          },
          process.env.JWT_KEY,
              { expiresIn:"3d" }
          )
    
          const { password, ...others } = user._doc
          res.json({...others, accessToken});
      } catch (err){
          res.json(err);
      }

  });

module.exports = router