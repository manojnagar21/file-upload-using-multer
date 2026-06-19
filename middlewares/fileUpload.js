const multer = require("multer");
const path = require("path");
// Configure the storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the folder where files will be saved
		// const uploadPath = path.join(__dirname, 'uploads');
        // // Create folder if it doesn't exist
        // if (!fs.existsSync(uploadPath)) {
        //     fs.mkdirSync(uploadPath, { recursive: true });
        // }
        // cb(null, uploadPath);
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // Generate unique file name to avoid collisions
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const newFileName = file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
// Filter files by format (e.g., images only)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|txt|text/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);
    if(extName && mimeType) {
        cb(null, true);
    } else cb(
        new Error("Only images and text files (jpeg, jpg, png, gif, txt) are allowed"),
        false
    )
}
// Initialize the multer middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit size to 5MB
    fileFilter: fileFilter
});
module.exports = upload;