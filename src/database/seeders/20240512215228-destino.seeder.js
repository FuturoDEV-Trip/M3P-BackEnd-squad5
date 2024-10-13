'use strict';
const { QueryInterface, Sequelize } = require("sequelize");
const Destino = require("../../models/Destino");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await Destino.bulkCreate([
        {
            id_usuario: 1,
            nome_destino: "Praia de Floripa",
            descricao_destino: "Lagoinha do Leste fica entre a Praia do Matadeiro e Pântano do Sul, no Sul da Ilha de Santa Catarina.",
            localidade_destino: "Lagoinha do Leste",
            uf_destino:"SC",
            coordenadas_destino: "Latitude: 27º 46' 26 - Longitude: 48 29 07"
        },
        {
            id_usuario: 1,
            nome_destino: "Praias de Floripa",
            descricao_destino: "Fica no leste da Ilha de Santa Catarina, próxima a Lagoa da Conceição. Com uma extensão de 960 metros",
            localidade_destino: "Praia Mole",
            uf_destino:"SC",
            coordenadas_destino: "Latitude: 27º 46' 26 - Longitude 27 41 36"
        },
        {
            id_usuario: 2,
            nome_destino: "Praias de Floripa",
            descricao_destino: "oferece uma água limpa e cristalina, além de belezas naturais e ótimas ondas para o surf e bodyboarding.",
            localidade_destino: "praia Brava",
            uf_destino:"SC",
            coordenadas_destino: "Latitude: 27º 46' 26 - Longitude 27 41 36"
        }
    ])
},

down: async (QueryInterface, Sequelize) => {
    await Destino.destroy({
        id_usuario: [
            1, 
            2
        ] 
    })
}
};
