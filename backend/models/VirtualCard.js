const mongoose = require('mongoose');

const virtualCardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cardHolderName: { type: String, required: true },
    cardNumber: { type: String, unique: true, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    balance: { type: Number, default: 0 },
    cardType: { type: String, enum: ['visa', 'mastercard'], default: 'visa' },
    status: { type: String, enum: ['active', 'blocked', 'pending'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('VirtualCard', virtualCardSchema);
