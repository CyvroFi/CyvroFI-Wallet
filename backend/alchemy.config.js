const { Alchemy, Network } = require('alchemy-sdk');

// Alchemy কনফিগারেশন সেটআপ
const settings = {
    apiKey: process.env.ALCHEMY_API_KEY, // আমরা পরে .env ফাইলে কী (Key) বসাবো
    network: Network.ETH_MAINNET, // ডিফল্টভাবে ইথেরিয়াম মেইননেট সেট করা (পরে পরিবর্তন করা যাবে)
};

const alchemy = new Alchemy(settings);

/**
 * নেটওয়ার্ক পরিবর্তন করার ফাংশন (যদি ইউজার অন্য চেইন ব্যবহার করতে চায়)
 * @param {string} networkName - যেমন: 'polygon', 'arbitrum'
 */
const getAlchemyInstance = (networkName = 'ethereum') => {
    let network;
    switch (networkName.toLowerCase()) {
        case 'polygon':
            network = Network.MATIC_MAINNET;
            break;
        case 'arbitrum':
            network = Network.ARB_MAINNET;
            break;
        default:
            network = Network.ETH_MAINNET;
    }
    
    return new Alchemy({ ...settings, network });
};

module.exports = {
    alchemy,
    getAlchemyInstance
};
