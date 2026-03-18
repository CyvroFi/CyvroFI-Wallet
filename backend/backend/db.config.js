const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MONGODB_URI ভেরিয়েবলটি আমরা পরে .env ফাইলে সেট করবো
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        // ডাটাবেস কানেক্ট না হতে পারলে সার্ভার বন্ধ করে দেবে
        process.exit(1); 
    }
};

module.exports = connectDB;
