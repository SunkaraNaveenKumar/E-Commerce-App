const Supplier = require("../models/Supplier")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const supplierAuthController = {}

//REGISTER
supplierAuthController.register = (async (req, res) => {
  const newSupp = new Supplier({
    ...req.body,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SUPP).toString()
  })

  try {
    const savedSupplier = await newSupp.save()
    res.json(savedSupplier)
  } catch (err) {
    console.log(err)
    res.json(err)
  }

})

// LOGIN
supplierAuthController.login = (async (req, res) => {
      try{
          const supplier = await Supplier.findOne(
              {
                  username: req.body.username
              }
          )

          !supplier && res.json("WRONG USERNAME!!!")

          const hashedPassword = CryptoJS.AES.decrypt(supplier.password, process.env.PASSWORD_SUPP)


          const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

          const inputPassword = req.body.password
          
          originalPassword != inputPassword && res.json("WRONG PASSWORD!!!")

          const accessToken = jwt.sign(
          {
              id: supplier._id,
              isAdmin: supplier.isAdmin,
          },
          process.env.JWT_SUPP_KEY,
              { expiresIn:"3d" }
          )
    
          const { password, ...others } = supplier._doc
          res.json({...others, accessToken});
      } catch (err){
          res.json(err);
      }
  });

module.exports = supplierAuthController