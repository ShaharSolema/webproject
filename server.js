// const express=require('express')
// const app=express()
// app.use(express.json())
// app.use("")

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/nailArtistEshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const clientRoutes = require('./routes/clients');
const productRoutes = require('./routes/products');

app.use('/api/clients', clientRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
