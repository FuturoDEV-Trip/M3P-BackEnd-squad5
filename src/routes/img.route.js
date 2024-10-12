const { Router } = require('express');
const multer = require('multer');
const UploadImagesService = require('../service/UploadImagesService');
const DeleteImagesService = require('../service/DeleteImagesService')
const multerConfig = require('../config/multer');

const imgRoutes = Router();
const upload = multer(multerConfig);

imgRoutes.post('/a', upload.single('file'), async (req, res) => {
    try {
        const uploadImagesService = new UploadImagesService();
        await uploadImagesService.execute(req.file); 
        return res.send('Arquivo enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar o arquivo:', error); 
        return res.status(500).send('Erro ao enviar o arquivo');
    }
});

imgRoutes.delete('/:filename', async (req, res) => {
    const { filename } = req.params;

    const deleteImagesService = new DeleteImagesService();

    try {
        await deleteImagesService.execute(filename);
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = imgRoutes;
