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
  const token = req.headers.token.split(' ')[1]
  let tokenData
  try {
    tokenData = jwt.verify(token, "jwtinfo1")
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
  verifyToken(req, res, () => {
    if (req.supplier.isAdmin) {
      next();
    } else {
      res.json("SORRY, YOU ARE NOT ALLOWED!")
    }
  })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, authenticateUser }