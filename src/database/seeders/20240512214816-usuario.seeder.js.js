"use strict";
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
        senha_usuario:
          "$2a$08$XKKfg9UY7USCGmkwrCLUsulevXnUVOPWPsUO5JUb2XZlGEdqnpCBO",
        nascimento_usuario: "1965-04-15",
        flag_usuario: false,
      },
      {
        cpf_usuario: "04136192908",
        nome_usuario: "Daiane Guerreiro",
        sexo_usuario: "Feminino",
        cep_usuario: "88025450",
        endereco_usuario: "",
        email_usuario: "daivg@gmail.com",
        senha_usuario:
          "$2a$08$XKKfg9UY7USCGmkwrCLUsulevXnUVOPWPsUO5JUb2XZlGEdqnpCBO",
        nascimento_usuario: "1984-06-26",
        flag_usuario: false,
      },
      {
        cpf_usuario: "32452578991",
        nome_usuario: "Simone Rosa",
        sexo_usuario: "Feminino",
        cep_usuario: "88115251",
        endereco_usuario: "",
        email_usuario: "simonerosa@gmail.com",
        senha_usuario:
          "$2a$08$XKKfg9UY7USCGmkwrCLUsulevXnUVOPWPsUO5JUb2XZlGEdqnpCBO",
        nascimento_usuario: "1998-08-23",
        flag_usuario: false,
      },
      {
        cpf_usuario: "81019628910",
        nome_usuario: "Ian Bruno Sergio Carvalho",
        sexo_usuario: "Masculino",
        cep_usuario: "88095565",
        endereco_usuario: "",
        email_usuario: "ian-carvalho@gmail.com",
        senha_usuario:
          "$2a$08$XKKfg9UY7USCGmkwrCLUsulevXnUVOPWPsUO5JUb2XZlGEdqnpCBO",
        nascimento_usuario: "1984-07-13",
        flag_usuario: false,
      },
      {
        cpf_usuario: "66113267903",
        nome_usuario: "Joana Sara Melo",
        sexo_usuario: "Feminino",
        cep_usuario: "89214240",
        endereco_usuario: "",
        email_usuario: "joana_melo@graficajardim.com.br",
        senha_usuario:
          "$2a$08$XKKfg9UY7USCGmkwrCLUsulevXnUVOPWPsUO5JUb2XZlGEdqnpCBO",
        nascimento_usuario: "1984-06-26",
        flag_usuario: true,
      },
    ]);
  },

  down: async (QueryInterface, Sequelize) => {
    await Usuario.destroy({
      where: {
        email_usuario: [
          'mariog@gmail.com',
          'daivg@gmail.com',
          "joana_melo@graficajardim.com.br",
          "ian-carvalho@gmail.com",
          "simonerosa@gmail.com",
        ]
      }
    });
  },
};
