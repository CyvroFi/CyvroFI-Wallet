const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide your full name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false // ডাটাবেস থেকে ডেটা ডাকার সময় পাসওয়ার্ড অটোমেটিক আসবে না (সিকিউরিটি)
    },
    telegramId: {
        type: String,
        unique: true,
        sparse: true // যদি কেউ টেলিগ্রাম ছাড়াই সাইনআপ করে তবে এরর দেবে না
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// পাসওয়ার্ড সেভ করার আগে এনক্রিপ্ট (Hash) করা
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// ইউজার যখন লগইন করবে তখন পাসওয়ার্ড ম্যাচ করার ফাংশন
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
