const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/testdb";

async function connectDB() {
    try {
        await mongoose.connect(uri, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit process if connection fails
    }
}

module.exports = connectDB;
