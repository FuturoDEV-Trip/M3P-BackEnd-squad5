const { Router } = require("express");
const LoginController = require("../controllers/Logincontroller");

const loginRoutes = new Router();

loginRoutes.post('/', LoginController.login);

module.exports = loginRoutes;