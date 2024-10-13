const { DataTypes } = require('sequelize')
const { connection } = require('../database/connections')
const {hash}  = require('bcryptjs')

const Usuario = connection.define('usuarios', {
      cpf_usuario: {
        type: DataTypes.STRING
      },
      nome_usuario: {
        type: DataTypes.STRING
      },
      sexo_usuario: {
        type: DataTypes.STRING
      },
      cep_usuario: {
        type: DataTypes.STRING
      },
      endereco_usuario: {
        type: DataTypes.STRING
      },
      email_usuario: {
        type: DataTypes.STRING
      },
      senha_usuario: {
        type: DataTypes.STRING
      },
      nascimento_usuario: {
        type: DataTypes.DATE
      },
      flag_usuario: {
        type: DataTypes.BOOLEAN,
      }
})

Usuario.beforeSave(async (usuario) => {
    usuario.senha_usuario =  await hash(usuario.senha_usuario, 8)
    return usuario
})

module.exports = Usuario


