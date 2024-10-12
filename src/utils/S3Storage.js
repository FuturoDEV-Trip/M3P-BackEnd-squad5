const path = require('path');
const fs = require('fs');
const aws = require('aws-sdk');

const uploadConfig = require('../config/multer');

class S3Storage {
  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  async saveFile(filename) {
    const originalPath = path.resolve(uploadConfig.directory, filename);
    const mime = await import('mime');
    const ContentType = mime.default.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: 'viagem365',
        Key: filename,
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
  }

  async deleteFile(filename) {
    await this.client
      .deleteObject({
        Bucket: 'viagem365',
        Key: filename,
      })
      .promise();
  }
}

module.exports = S3Storage;
