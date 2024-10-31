<<<<<<< HEAD
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB=require('./Config/db');
const Product = require('./Models/Product');
const User = require('./Models/User');
connectDB();







app.listen(3000, ()=>{
    console.log("Server is Listening on Port 3000")
});


=======
const express=require('express')
const app=express()
app.use(express.json())
app.use("")
>>>>>>> d629e02bcdf9f4f0948a31375175de762f6736c5
