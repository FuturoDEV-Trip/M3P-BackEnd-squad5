const { Router } = require("express");
const DestinoController = require("../controllers/Destinocontroller");

const destinoPublicoRoutes = new Router();

destinoPublicoRoutes.get('/', DestinoController.listarDestinosPublicos);

module.exports = destinoPublicoRoutes;