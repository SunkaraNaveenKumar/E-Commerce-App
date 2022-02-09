const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SUPP_KEY, (err, supplier) => {
      if (err) res.json("INVALID TOKEN!")
      req.supplier = supplier;
      next();
    });
  } else {
    return res.json("YOU ARE NOT AUTHENTICATED!")
  }
};

const authenticateUser = (req,res,next) => {
  const auth = req.headers.token
   const token = auth.split(' ')[1]
   let tokenData
   try {
     tokenData = jwt.verify(token, process.env.JWT_KEY)
     next()
   } catch (error) {
     res.json(error.message)
   }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.supplier.id === req.params.id || req.supplier.isAdmin) {
      next();
    } else {
      res.json("SORRY, YOU ARE NOT ALLOWED!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  const token = req.headers.token.split(' ')[1]
  let tokenData
  try {
    tokenData = jwt.verify(token, process.env.JWT_SUPP_KEY)
  }catch(err) {
    res.json(err)
  }

  verifyToken(req, res, () => {
    if (tokenData.isAdmin) {
      next();
    } else {
      res.json("SORRY, YOU ARE NOT ALLOWED!")
    }
  })
}

module.exports = { verifyToken, authenticateUser, verifyTokenAndAuthorization, verifyTokenAndAdmin }