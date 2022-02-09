const express = require('express')
const router = express.Router()
const { verifyToken, authenticateUser, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../app/middlewares/verifyToken')
const usersController = require('../app/controllers/usersController')
const suppliersController = require('../app/controllers/suppliersController')
const productController = require('../app/controllers/productController')
const cartController = require('../app/controllers/cartController')
const orderController = require('../app/controllers/orderController')
const userAuthController = require('../app/controllers/userAuthController')
const suppAuthController = require('../app/controllers/suppAuthController')
const addressController = require('../app/controllers/addressController')

// router.get('/')

router.post('/api/userAuth/register', userAuthController.register)
router.post('/api/userAuth/login', userAuthController.login)

router.post('/api/suppAuth/register', suppAuthController.register)
router.post('/api/suppAuth/login', suppAuthController.login)

router.put('/api/users/:id', authenticateUser, usersController.update)
router.get('/api/users/', authenticateUser, usersController.list)
router.get('/api/users/:id', authenticateUser, usersController.show)
router.delete('/api/users/:id', authenticateUser, usersController.destroy)

router.put('/api/supplier/:id', verifyTokenAndAuthorization, suppliersController.update)
router.get('/api/supplier/', verifyTokenAndAdmin, suppliersController.list)
router.get('/api/supplier/:id', verifyTokenAndAdmin, suppliersController.show)
router.delete('/api/supplier/:id', verifyTokenAndAuthorization, suppliersController.destroy)

router.post('/api/product/:supplierId', verifyTokenAndAdmin, productController.create)  // 
router.put('/api/product/:id', verifyTokenAndAdmin, productController.update) // 
router.get('/api/product/:id',  authenticateUser, productController.show)
router.get('/api/product/',  productController.list) // authenticateUser, //not required
router.delete('/api/product/:id', verifyTokenAndAdmin, productController.destroy) // verifyTokenAndAdmin,

router.post('/api/orders/:cartId',  orderController.create) // authenticateUser,
router.put('/api/orders/:id', authenticateUser, orderController.update)
router.get('/api/orders/:id', authenticateUser, orderController.show)
router.get('/api/orders/', authenticateUser, orderController.list)
router.delete('/api/orders/:id',authenticateUser, orderController.destroy)

router.post('/api/cart/:productId', authenticateUser, cartController.create)
router.put('/api/cart/:id', authenticateUser, cartController.update)
router.get('/api/cart/:userId', authenticateUser, cartController.show)
router.get('/api/cart/', authenticateUser, cartController.list)
router.delete('/api/cart/:id',authenticateUser, cartController.destroy) 
router.delete('/api/cart/deleteAll' ,cartController.deleteAll)

router.post('/api/suppAddress/register', addressController.register)
router.post('/api/addaddress', addressController.create)
router.get('/api/addresses', addressController.show)
router.delete('/api/address/:id', addressController.destroy)

module.exports = router