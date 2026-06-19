const express = require("express");
const router = express.Router();
const upload = require("../middlewares/fileUpload.js");
const {
    addSingleFile,
    addMultipleFile,
    editFile,
    deleteFile,
    getFile,
    getFiles
} = require("../controllers/fileController.js")
router.use((req, res, next) => {
    console.log("Route time: " + Date.now());
    next();
});
router.get("/get", getFiles);
router.get("/get/:id", getFile);
router.post("/add-single", upload.single("file"), addSingleFile);
router.post("/add-multiple", upload.array("file", 5), addMultipleFile);
router.put("/edit/:id", editFile);
router.delete("/delete/:id", deleteFile);
module.exports = router;