const { Router } = require('express') 

const { auth } = require('../middleware/auth')

const Usuariocontroller = require('../controllers/Usuariocontroller')

const usuarioRoutes = new Router()

usuarioRoutes.post('/', Usuariocontroller.cadastrarUsuario)
usuarioRoutes.get('/', Usuariocontroller.listarUsuarios)
usuarioRoutes.get('/:id', Usuariocontroller.listarUsuarioPorId)
usuarioRoutes.put('/:id', auth, Usuariocontroller.atualizarUsuario)
usuarioRoutes.delete('/:id', Usuariocontroller.deletarUsuario)

module.exports = usuarioRoutes