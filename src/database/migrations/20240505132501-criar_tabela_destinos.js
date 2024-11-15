'use strict';

const { INTEGER } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
        type:Sequelize.STRING
      },
      descricao_destino: {
        allowNull: false,
        type:Sequelize.STRING
      },
      localidade_destino: {
        allowNull: false,
        type:Sequelize.STRING
      },
      coordenadas_destino: {
        allowNull: false,
        type:Sequelize.STRING
      },
      uf_destino:{
        allowNull:false,
        type:Sequelize.STRING
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
