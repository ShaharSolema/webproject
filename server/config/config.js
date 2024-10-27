module.exports = {
    db: {
      uri: process.env.MONGO_URI || 'mongodb://localhost:27017/TryDB', 
    },
    server: {
      port: process.env.PORT || 3000,
    },
    jwtSecret: process.env.JWT_SECRET || 'asjdkfbqkwrqwbrc2124!@#%12hsdf', //SAVE TO ENV BEFORE PROD 
    api: {
      version: 'v1', // API version
      prefix: '/api', // API prefix
    },
  };