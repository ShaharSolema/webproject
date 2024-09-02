module.exports = {
    db: {
      uri: process.env.MONGO_URI || 'mongodb://localhost:27017/TryDB', 
    },
    server: {
      port: process.env.PORT || 3000,
    },
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key', 
    api: {
      version: 'v1', // API version
      prefix: '/api', // API prefix
    },
  };