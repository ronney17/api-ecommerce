const express = require('express')
var cors = require('cors')
const routes = express.Router()

// Import Controllers
const UserController = require('./app/controller/userController')   
const LoginController = require('./app/controller/loginController')
const ProductController = require('./app/controller/productController') 
const PurchaseController = require('./app/controller/purchaseController') 

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

routes.use(cors(corsOptions))

routes.get('/', function(req, res) {
  return res.send('API is Running ' + new Date())
})

// Users
routes.get('/user', UserController.read)
routes.get('/user/:token', UserController.getUser)
routes.post('/user', UserController.create)
routes.patch('/user/:token', UserController.update)
routes.delete('/user/:idToDelete/:token', UserController.delete)
routes.patch('/user/:activate/:token', UserController.update)

// Login
routes.post('/login', LoginController.login)

// Change password
routes.patch('/change-password/:token', LoginController.changePassword)

// Forgot password
routes.post('/forgot-password', LoginController.forgotPassword)

// Products
routes.get('/product', ProductController.read)
routes.post('/product/:token', ProductController.create)
routes.patch('/product/:idProduct/:token', ProductController.update)
routes.delete('/product/:idProduct/:token', ProductController.delete)

// Purchases
routes.get('/purchase', PurchaseController.read)
routes.post('/purchase/:token', PurchaseController.create)
routes.patch('/purchase/:idPurchase/:token', PurchaseController.update)

module.exports = routes