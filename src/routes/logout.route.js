const { Router } = require("express");
const LoginController = require("../controllers/Logincontroller");
const { auth } = require("../middleware/auth");

const logoutRoutes = new Router();

logoutRoutes.post('/', auth, LoginController.logout);

module.exports = logoutRoutes;
