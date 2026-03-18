require('dotenv').config();
const app = require('./app');
const connectDB = require('./db.config');

const PORT = process.env.PORT || 5000;

// গ্লোবাল Uncaught Exception হ্যান্ডলার
process.on('uncaughtException', (err) => {
    console.error(`❌ Uncaught Exception: ${err.message}`);
    console.error('Shutting down due to uncaught exception...');
    process.exit(1);
});

const startServer = async () => {
    try {
        await connectDB();
        console.log('✅ MongoDB Database connected successfully.');

        const server = app.listen(PORT, () => {
            console.log(`🚀 CyvroFI Backend Server is running on port ${PORT}`);
        });

        // গ্লোবাল Unhandled Rejection হ্যান্ডলার
        process.on('unhandledRejection', (err) => {
            console.error(`❌ Unhandled Rejection: ${err.message}`);
            console.log('Shutting down the server gracefully...');
            server.close(() => {
                process.exit(1);
            });
        });

    } catch (error) {
        console.error(`❌ Server Initialization Failed: ${error.message}`);
        process.exit(1);
    }
};

startServer();
