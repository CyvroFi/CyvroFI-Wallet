const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    mnemonic: {
        type: String, // এটি এনক্রিপ্টেড অবস্থায় সেভ করা হবে
        required: true
    },
    privateKey: {
        type: String, // এটিও এনক্রিপ্টেড অবস্থায় থাকবে
        required: true
    },
    balances: {
        eth: { type: Number, default: 0 },
        usdt: { type: Number, default: 0 },
        usdc: { type: Number, default: 0 }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;

