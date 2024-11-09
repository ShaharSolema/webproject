const rateLimit = require('express-rate-limit');

const orderLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // limit each IP to 3 orders per minute
    message: {
        success: false,
        message: 'יותר מדי ניסיונות הזמנה. אנא נסה שוב בעוד דקה.'
    }
});

module.exports = orderLimiter; 