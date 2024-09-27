const { Router } = require('express') 

const { auth } = require('../middleware/auth')

const DestinoController = require('../controllers/Destinocontroller')

const destinoRoutes = new Router()

destinoRoutes.post('/', auth, DestinoController.cadastrarDestino)
destinoRoutes.get('/', auth, DestinoController.listarTodos)
destinoRoutes.get('/:id', auth, DestinoController.listarEspecifico)
destinoRoutes.put('/:id', auth, DestinoController.alterarDestino)
destinoRoutes.delete('/:id', auth, DestinoController.excluirDestino)

module.exports = destinoRoutes