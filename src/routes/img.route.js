const { Router } = require('express');
const multer = require('multer');
const UploadImagesService = require('../service/UploadImagesService'); 
const multerConfig = require('../config/multer');

const imgRoutes = Router();
const upload = multer(multerConfig);

imgRoutes.post('/a', upload.single('file'), async (req, res) => {
    try {
        const uploadImagesService = new UploadImagesService(); 
        await uploadImagesService.execute(req.file); 
        return res.send('Arquivo enviado com sucesso!');
    } catch (error) {
        return res.status(500).send('Erro ao enviar o arquivo');
    }
});

imgRoutes.delete('/:filename', async (req, res) => {
    // Lógica para deletar o arquivo
});

module.exports = imgRoutes;
