const exress = require("express");
const path = require("path");
const fs = require("fs");
const createFileChecksum = require("../helpers/fileChecksum.js");
const File = require("../models/File.js");
const {
    uploadImage,
    getAssetInfo
} = require("../helpers/cloudinary.js");
const addSingleFile = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({
                status: false,
                message: "No file uploaded"
            });
        }
        // Generate SHA-256 Checksum from file buffer
        const fileChecksum = createFileChecksum(req.file.path);

        // Check if the file already exists in the database
        const existingFile = await File.findOne({ checksum: fileChecksum });
        if (existingFile) {
            fs.unlinkSync(req.file.path);
            return res.status(409).json({
                status: false,
                message: 'File already exists (Duplicate detected via checksum).',
                id: existingFile._id
            });
        }
        // upload file in cloudinary
        const { publicId, resourceType } = await uploadImage(req.file.path, req.file.mimetype);
        // get file from cloudinary
        const getFileDetailsByPublicId = await getAssetInfo(publicId, resourceType);
        // create new file data
        const newFile = await File.create({
            originalFileName: path.parse(req.file.originalname).name,
            newFileName: path.parse(req.file.filename).name,
            fileExtension: path.extname(req.file.originalname).slice(1),
            // fileExtensionWithoutDot: path.extname(req.file.originalname).slice(1),
            fieldName: req.file.fieldname,
            fileMimeType: req.file.mimetype,
            fileSize: req.file.size,
            // fileUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
            fileUrl: getFileDetailsByPublicId,
            checksum: fileChecksum,
            // checksum: Math.random(),
            tags: req.body.tags
        });
        await newFile.save();
        res.status(201).json({
            status: true,
            message: "File added successfully",
            data: req.file
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Something went wrong: " + error
        });
    }
}
const addMultipleFile = async (req, res) => {
    try {
        if(!req.files || req.files.length === 0) {
            return res.status(400).json({
                status: false,
                message: "No files uploaded"
            })
        }
        res.status(201).json({
            status: true,
            message: "File added successfully",
            data: req.files
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Something went wrong: " + error
        });
    }
}
const editFile = async (req, res) => {
    try {
        res.status(200).json({
            status: true,
            message: "File edited successfully",
            data: []
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Something went wrong: " + error
        });
    }
}
const deleteFile = async (req, res) => {
    try {
        res.status(200).json({
            status: true,
            message: "File deleted successfully",
            data: []
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Something went wrong: " + error
        });
    }
}
const getFile = async (req, res) => {
    try {
        res.status(201).json({
            status: true,
            message: "File fetched successfully",
            data: []
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Something went wrong: " + error
        });
    }
}
const getFiles = async (req, res) => {
    try {
        const files = await File.find({});
        res.status(200).json({
            status: true,
            message: "File list fetched successfully",
            data: files
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Something went wrong: " + error
        });
    }
}
module.exports = {
    addSingleFile,
    addMultipleFile,
    editFile,
    deleteFile,
    getFile,
    getFiles
}