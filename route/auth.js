const express = require('express');
const routes = express.Router();
const authController = require('../controller/auth')
routes.get("/login", authController.renderLoginPage);

routes.post("/login", authController.postLoginData)

routes.post("/logout", authController.removeSession)

routes.get("/register", authController.renderRegisterPage)

routes.post("/register", authController.haldleRegister);

routes.get("/reset-password", authController.renderResetPassword)
routes.post("/reset-password", authController.resetLinkSend)

routes.get("/feedback", authController.renderFeedBack)
routes.get("/reset-password/:token", authController.renderNewpassword);
module.exports = routes;

routes.post("/new-password",authController.changeNewPassword)
