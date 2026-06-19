require("dotenv").config();
const mongoose = require("mongoose");
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection error: " + error);
    }
}
module.exports = connectToDB;