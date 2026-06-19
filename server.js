require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const connectToDB = require("./database/db.js");
const fileRouter = require("./router/fileRoutes.js");
const PORT = process.env.PORT || 5000;

const uploadDir = path.join(__dirname, "uploads");
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// use middleware
app.use(express.json());
app.use("/api/", fileRouter);
app.use("/uploads", express.static(uploadDir));

app.get("/", (req, res) => {
    console.log("Hello World");
    res.status(200).json({
        msg: "Hello World"
    })
});
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
connectToDB();