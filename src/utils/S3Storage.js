const AWS = require('aws-sdk');
const path = require('path');
const multerConfig = require('../config/multer')
const mime = require('mime');
const fs = require('fs')
class S3Storage {
    constructor() {
        this.client = new AWS.S3({
            region: 'us-east-1'
        });
    }

    async saveFile(filename) {
        const originalPath = path.resolve(multerConfig.directory, filename);

        const ContentType = mime.getType(originalPath);
        if (!ContentType) {
            throw new Error("Arquivo não achado!")
        }

        const fileContet = await fs.promises.readFile(originalPath);

        this.client.putObject({
            Bucket:'viagem365',
            Key: filename,
            ACL: 'public-read',
            Body: fileContet,
            ContentType,
        })
        .promise()

        await fs.promises.unlink(originalPath)
    }

}
module.exports = S3Storage