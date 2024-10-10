const { Router } = require('express') 

const { auth } = require('../middleware/auth')

const DestinoController = require('../controllers/Destinocontroller')

const destinoRoutes = new Router()

destinoRoutes.post('/', auth, DestinoController.cadastrarDestino)
destinoRoutes.get('/', auth, DestinoController.listarTodos)
destinoRoutes.get('/:id', auth, DestinoController.listarEspecifico)
destinoRoutes.put('/:id', auth, DestinoController.alterarDestino)
destinoRoutes.delete('/:id', auth, DestinoController.excluirDestino)


destinoRoutes.post("/upload-image", async (req, res) => {
    try {
      return res.json({
        error: false,
        mensagem: "Upload realizado com sucesso"
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        mensagem: "Erro ao realizar upload",
      });
    }
  });

module.exports = destinoRoutes