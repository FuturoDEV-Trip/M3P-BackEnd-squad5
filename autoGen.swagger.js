const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API - Viagem365",
    description: "MVP da aplicação BackEnd",
    version: "1.0.0"
  },
  host: "localhost:3000",
  security: [{ apiKeyAuth: [] }],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "authorization",
      description: "Token Autenticação de usuário",
    },
  },
};

const outputFile = "./src/routes/doc.swagger.json";
const routes = ["./src/server.js"];

swaggerAutogen(outputFile, routes, doc);
