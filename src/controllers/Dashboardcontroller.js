const Destino = require('../models/Destino');
const Usuario = require('../models/Usuario');

class DashboardController {
  async getDashboardData(req, res) {
  
    try {
      const totalLocais = await Destino.count();
      const usuariosAtivos = await Usuario.count({
        where:{flag_usuario:true}
      });
      const destinos = await Destino.findAll({
        attributes: ['nome_destino', 'descricao_destino', 'cidade_destino']
      });

      res.status(200).json({
        totalLocais,
        usuariosAtivos,
        destinos
      });
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