const Destino = require('../models/Destino')
const Usuario = require('../models/Usuario')

class DashboardController {
  async getDashboardData(req, res) {
  
    try {
      const totalLocais = await Destino.count()

      const usuariosAtivos = await Usuario.count({
        where:{flag_usuario:true}
      })

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