"use strict";

const { INTEGER } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuarios", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      cpf_usuario: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nome_usuario: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sexo_usuario: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cep_usuario: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      endereco_usuario: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email_usuario: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      senha_usuario: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nascimento_usuario: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usuarios");
  },
};
