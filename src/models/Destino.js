const { DataTypes } = require('DataTypes')
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
    },
    categoria_destino: {
        type: DataTypes.STRING
    },
    numero_destino: {
        type: DataTypes.INTEGER
    },
    cidade_destino: {
        type: DataTypes.STRING
    },
    complemento_destino: {
        type: DataTypes.STRING
    }
})

module.exports = Destino

