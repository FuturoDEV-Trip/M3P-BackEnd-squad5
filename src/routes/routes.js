const { Router } = require("express");
const usuarioRoutes = require("./usuario.route");
const destinoRoutes = require("./destino.route");
const loginRoutes = require("./login.route");
const logoutRoutes = require("./logout.route");
const dashboardRoutes = require("./dashboard.route");
const destinoPublicoRoutes = require("./destinoPublico.route");

const routes = Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc.swagger.json');

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.use("/usuarios", usuarioRoutes);
routes.use("/destinos", destinoRoutes);
routes.use("/destinos-publicos", destinoPublicoRoutes);
routes.use("/login", loginRoutes);
routes.use("/logout", logoutRoutes);
routes.use("/", dashboardRoutes);

module.exports = routes;
