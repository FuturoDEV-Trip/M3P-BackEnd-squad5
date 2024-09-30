'use strict';
const { QueryInterface, Sequelize } = require("sequelize");
const Usuario = require("../../models/Usuario");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await Usuario.bulkCreate([
        {
            cpf_usuario: "52087670900",
            nome_usuario: "Mario Guerreiro",
            sexo_usuario: "Masculino",
            cep_usuario: "88060400",
            endereco_usuario: "",
            email_usuario: "mariog@gmail.com",
            senha_usuario:"$2a$08$XKKfg9UY7USCGmkwrCLUsulevXnUVOPWPsUO5JUb2XZlGEdqnpCBO",
            nascimento_usuario: "1965-04-15"
        },
        {
            cpf_usuario: "04136192908",
            nome_usuario: "Daiane Guerreiro",
            sexo_usuario: "Feminino",
            cep_usuario: "88025450",
            endereco_usuario: "",
            email_usuario: "daivg@gmail.com",
            senha_usuario:"$2a$08$XKKfg9UY7USCGmkwrCLUsulevXnUVOPWPsUO5JUb2XZlGEdqnpCBO",
            nascimento_usuario: "1984-06-26"
        }
    ])
},

  down: async (QueryInterface, Sequelize) => {
      await Usuario.destroy({
         email: [
              "bolamg@gmail.com", 
              "daivg@gmail.com"
        ] 
    })
  }
}