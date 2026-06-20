const crypto = require("crypto");
const fs = require("fs");
const createFileChecksum = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    const checksum = crypto
        .createHash('sha256')
        .update(fileBuffer)
        .digest('hex');
    return checksum;
}
module.exports = createFileChecksum;