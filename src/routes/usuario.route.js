const { Router } = require('express') 

const { auth } = require('../middleware/auth')

const Usuariocontroller = require('../controllers/Usuariocontroller')

const usuarioRoutes = new Router()

usuarioRoutes.post('/', Usuariocontroller.cadastrarUsuario)

module.exports = usuarioRoutes