'use strict';

const { INTEGER } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'destinos',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        id_usuario: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'usuarios',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        nome_destino: {
          allowNull: false,
          type: Sequelize.STRING
        },
        descricao_destino: {
          allowNull: false,
          type: Sequelize.STRING
        },
        localidade_destino: {
          allowNull: false,
          type: Sequelize.STRING
        },
        cep_destino: {
          type: Sequelize.STRING,
          allowNull: false
        },
        img_destino: {
          type: Sequelize.STRING,
          allowNull: false
        },
        categoria_destino: {
          type: Sequelize.STRING,
          allowNull: false
        },
        numero_destino: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        cidade_destino: {
          type: Sequelize.STRING,
          allowNull: false
        },
        complemento_destino: {
          type: Sequelize.STRING,
          allowNull: false
        },
        coordenadas_destino: {
          allowNull: false,
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("destinos");
  },

};
