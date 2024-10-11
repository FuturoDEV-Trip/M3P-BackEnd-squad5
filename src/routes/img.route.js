const { Router } = require('express')

const imgRoutes = new Router();
const UploadImagesService = require('../service/UploadImagesService')


imgRoutes.post('/', async (req, res) => {
    const UploadImagesService = new UploadImagesService();

    await UploadImagesService.execute();
    return response.send();

})

imgRoutes.delete('/:filename', async (req, res) => {

})

module.exports = imgRoutes

