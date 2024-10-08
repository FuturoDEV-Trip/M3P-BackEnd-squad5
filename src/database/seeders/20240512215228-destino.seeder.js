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
                cep_destino: "88067100",
                img_destino: "img/praia-lagoinha.jpg",
                categoria_destino: "Praia",
                cidade_destino: "Florianópolis",
                complemento_destino: "Trilha dificil porém vale a pena",
                latitude_destino: "-27.317161",
                longitude_destino: "-48.557608",
            },

            {
                id_usuario: 2,
                nome_destino: "Praias de Floripa",
                descricao_destino: "Fica no leste da Ilha de Santa Catarina, próxima a Lagoa da Conceição. Com uma extensão de 960 metros",
                localidade_destino: "Praia Mole",
                cep_destino: "88053620",
                img_destino: "img/praia-mole.jpg",
                categoria_destino: "Praia",
                cidade_destino: "Florianópolis",
                complemento_destino: "Trilha facíl demias",
                latitude_destino: "-27.4412321",
                longitude_destino: "-48.4858121"
            },
            {
                id_usuario: 3,
                nome_destino: "Praia Brava",
                descricao_destino: "oferece uma água limpa e cristalina, além de belezas naturais e ótimas ondas para o surf e bodyboarding.",
                localidade_destino: "Praia Brava",
                cep_destino: "88063400",
                img_destino: "img/praia-brava.jpg",
                categoria_destino: "Praia",
                cidade_destino: "Itajai",
                complemento_destino: "Amei o lugar, lugar lindo tranquilo",
                latitude_destino: "27.6759558",
                longitude_destino: "-48.4865151"
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
