const express = require('express');
const routes = express.Router();
const authController = require('../controller/auth')
routes.get("/login", authController.renderLoginPage);

routes.post("/login", authController.postLoginData)

routes.post("/logout", authController.removeSession)

routes.get("/register", authController.renderRegisterPage)

routes.post("/register", authController.haldleRegister);


module.exports = routes;

