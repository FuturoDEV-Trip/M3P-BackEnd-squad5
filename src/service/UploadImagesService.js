const S3Storage = require('../utils/S3Storage');

class UploadImagesService {
    async execute(file) {
        const s3Storage = new S3Storage();
        await s3Storage.saveFile(file.filename); // Aqui, você está usando file.filename
    }
}

module.exports = UploadImagesService;
