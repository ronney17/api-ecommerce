const express = require("express")
const routes = express.Router()
const UserController = require("./app/controller/userController")   
const LoginController = require("./app/controller/loginController")  

routes.get("/", function(req, res) {
  return res.send("API is Running " + new Date())
})

// Users
routes.get("/user", UserController.read)
routes.post("/user", UserController.create)
routes.patch("/user/:token", UserController.update)
routes.delete("/user/:token", UserController.delete)
routes.patch("/user/:activate/:token", UserController.update)

// Login
routes.post("/login", LoginController.login)

// Change password
routes.patch("/change-password/:token", LoginController.changePassword)

// Forgot password
routes.post("/forgot-password", LoginController.forgotPassword)

module.exports = routes