const { Router } = require("express");
const usuarioRoutes = require("./usuario.route");
const destinoRoutes = require("./destino.route");
const loginRoutes = require("./login.route");
const logoutRoutes = require("./logout.route");
const dashboardRoutes = require("./dashboard.route")
const imgRoutes = require("./img.route")


const routes = Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc.swagger.json');

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.use("/usuarios", usuarioRoutes);
routes.use("/destinos", destinoRoutes);
routes.use("/login", loginRoutes);
routes.use("/logout", logoutRoutes);
routes.use("/", dashboardRoutes);
routes.use('/uploadimg', imgRoutes)

module.exports = routes;
