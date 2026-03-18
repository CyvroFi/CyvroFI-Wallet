const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// রাউট ফাইলগুলো পরে তৈরি করা হবে, তাই আপাতত কমেন্ট করে রাখছি যেন কোনো এরর না দেয়
// const authRoutes = require('./routes/auth.routes');
// const walletRoutes = require('./routes/wallet.routes');

const app = express();

// ১. গ্লোবাল মিডলওয়্যার (Security & Data Parsing)
app.use(helmet()); // সার্ভারের সিকিউরিটি বাড়াবে
app.use(cors({
    origin: '*', // প্রোডাকশনে যাওয়ার সময় এখানে আপনার আসল ডোমেইন নাম বসবে
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(morgan('dev')); // কোন API কল হচ্ছে তার লগ কনসোলে দেখাবে
app.use(express.json()); // ইউজারের পাঠানো JSON ডেটা পড়ার জন্য
app.use(express.urlencoded({ extended: true }));

// ২. বেসিক হেলথ চেক রাউট (সার্ভার ঠিক আছে কি না তা টেস্ট করার জন্য)
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: '🚀 CyvroFI Wallet API is running smoothly!'
    });
});

// ৩. API রাউটস (পরবর্তীতে যখন আমরা ফাইলগুলো বানাবো, তখন এই কোডগুলো আনকমেন্ট করে দেবো)
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/wallet', walletRoutes);

// ৪. গ্লোবাল 404 Error Handler (কেউ যদি ভুল লিংকে বা API-তে ভিজিট করে)
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: '❌ Route not found!'
    });
});

module.exports = app;
