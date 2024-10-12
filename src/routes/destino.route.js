const { Router } = require('express') 
const UploadImagesService = require('../service/UploadImagesService');
const DeleteImagesService = require('../service/DeleteImagesService')
const multerConfig = require('../config/multer');
const multer = require('multer');

const { auth } = require('../middleware/auth')

const DestinoController = require('../controllers/Destinocontroller')

const destinoRoutes = new Router()
const upload = multer(multerConfig);

destinoRoutes.post('/', auth, DestinoController.cadastrarDestino)
destinoRoutes.get('/', auth, DestinoController.listarTodos)
destinoRoutes.get('/:id', auth, DestinoController.listarEspecifico)
destinoRoutes.put('/:id', auth, DestinoController.alterarDestino)
destinoRoutes.delete('/:id', auth, DestinoController.excluirDestino)

destinoRoutes.post('/upload-image', upload.single('file'), async (req, res) => {
    try {
        const uploadImagesService = new UploadImagesService();
        await uploadImagesService.execute(req.file); 
        return res.send('Arquivo enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar o arquivo:', error); 
        return res.status(500).send('Erro ao enviar o arquivo');
    }
});

destinoRoutes.delete('/upload-image/:filename', async (req, res) => {
    const { filename } = req.params;

    const deleteImagesService = new DeleteImagesService();

    try {
        await deleteImagesService.execute(filename);
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});


module.exports = destinoRoutes