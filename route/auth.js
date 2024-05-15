const express = require('express');
const routes = express.Router();
const authController = require('../controller/auth')
routes.get("/login", authController.renderLoginPage);

routes.post("/login",authController.postLoginData)


module.exports = routes;

