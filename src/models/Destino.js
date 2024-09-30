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
    coordenadas_destino: {
        type: DataTypes.STRING
    },
    img_destino: {
        type: DataTypes.STRING
    }
})

module.exports = Destino

