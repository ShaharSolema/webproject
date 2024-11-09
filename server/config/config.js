require('dotenv').config();

module.exports = {
    db: {
        uri: process.env.MONGO_URI,
    },
    server: {
        port: process.env.PORT,
    },
    jwtSecret: process.env.JWT_SECRET,
    api: {
        version: 'v1',
        prefix: '/api',
    },
};