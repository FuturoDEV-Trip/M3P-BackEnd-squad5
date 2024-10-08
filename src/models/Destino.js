const { DataTypes } = require('sequelize')
const { connection } = require('../database/connections')

const Destino = connection.define('destinos', {
    id_usuario: {
        type: DataTypes.INTEGER
    },
    nome_destino: {
        type: DataTypes.STRING
    },
    cep_destino: {
        type: DataTypes.STRING
    },
    descricao_destino: {
        type: DataTypes.STRING
    },
    localidade_destino: {
        type: DataTypes.STRING
    },
    img_destino: {
        type: DataTypes.STRING
    },
    latitude_destino: {
        type: DataTypes.STRING
    },
    longitude_destino: {
        type: DataTypes.STRING
    },
    cidade_destino: {
        type: DataTypes.STRING
    },
    complemento_destino: {
        type: DataTypes.STRING
    }
})

module.exports = Destino

