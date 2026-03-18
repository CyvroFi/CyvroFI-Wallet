const mongoose = require('mongoose');

const adminSettingSchema = new mongoose.Schema({
    withdrawalFee: { type: Number, default: 0.005 }, // ৫% ফি (উদাহরণ)
    minDeposit: { type: Number, default: 10 }, // সর্বনিম্ন ১০ ডলার
    maintenanceMode: { type: Boolean, default: false },
    supportTelegram: { type: String, default: '@your_support_handle' }
}, { timestamps: true });

module.exports = mongoose.model('AdminSetting', adminSettingSchema);
