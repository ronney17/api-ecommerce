const express = require("express");
const routes = express.Router();
const UserController = require("./app/controller/userController");   
const LoginController = require("./app/controller/loginController");  

routes.get("/", function(req, res) {
  return res.send("Minha primeira rota!");
});

// Users
routes.get("/user", UserController.index);
routes.post("/user", UserController.store);

// Login
routes.post("/login", LoginController.login);

// Change password
routes.patch("/change-password", LoginController.changePassword);

// Forgot password
routes.get("/forgot-password", LoginController.forgotPassword)
routes.post("/forgot-password", LoginController.forgotPassword)
routes.get("/forgot-password/:id/:token", LoginController.resetPassword)
routes.patch("/forgot-password/:id/:token", LoginController.resetPassword)

module.exports = routes;