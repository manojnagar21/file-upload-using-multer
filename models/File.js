const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
    originalFileName: {
        type: String,
        required: [true, "File name is required"],
        trim: true,
    },
    newFileName: {
        type: String,
        required: [true, "New file name is required"],
        unique: true,
        trim: true,
    },
    fileExtension: {
        type: String,
        required: [true, "File extension is required"],
        trim: true,
    },
    fieldName: {
        type: String,
        required: [true, "Field name is required"],
        trim: true,
    },
    fileMimeType: {
        type: String,
        required: [true, "File MIME type is required"],
        trim: true,
    },
    fileSize: {
        type: Number,
        required: [true, "File size is required"],
    },
    // Original File Name | Extension | MIME Type | File Size | Checksum / Hash
    fileUrl: {
        type: String,
        required: [true, "File Url is required"],
        unique: true,
        trim: true,
    },
    checksum: { 
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [String],
}, {
    timestamps: true
});
const File = mongoose.model("File", fileSchema);
module.exports = File;