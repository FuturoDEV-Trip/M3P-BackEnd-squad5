const Destino = require('../models/Destino')
const Usuario = require('../models/Usuario')

class DashboardController {
  async getDashboardData(req, res) {
    /*
      #swagger.tags = ['Dashboard']
      #swagger.summary = 'Obter dados do dashboard público'
      #swagger.description = 'Endpoint para retornar o total de locais de visitação e o número de usuários ativos.'
      #swagger.responses[200] = {
        description: 'Dados do dashboard obtidos com sucesso',
        schema: {
          total_locais: 123,
          usuarios_ativos: 456
        }
      }
      #swagger.responses[500] = {
        description: 'Erro ao obter os dados do dashboard'
      }
    */
    try {
      const totalLocais = await Destino.count()

      const usuariosAtivos = await Usuario.count()

      res.status(200).json({
        total_locais: totalLocais,
        usuarios_ativos: usuariosAtivos,
      })
    } catch (error) {
      console.error("Erro ao obter dados do dashboard", error.message)
      res.status(500).json({
        message: "Erro ao obter dados do dashboard",
        error: error.message
      })
    }
  }
}

module.exports = new DashboardController()