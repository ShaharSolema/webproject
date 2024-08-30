const mongoose = require('mongoose');
const Product = require('./Models/Product');
mongoose.connect('mongodb://localhost:27017/TestDB')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

/* const p = new Product({
    name: 'Ruby Grapefruit',
    price:1.99,
    category:'Fruit'
})
p.save().then(p=>{
    console.log(p)
}) 
.catch(e=>{
    console.log(e)
}) */
const seedproducts =[
    {
        name:'Fairy Eggplant',
        price: 1.00,
        category:'Veggie'
    },
    {
        name:'Organic Goddess Melon',
        price: 4.99,
        category:'Fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category:'Fruit'
    },
    {
        name:'Organic Celery',
        price:1.50,
        category:'Veggie'
    },
    {
        name:'Choclate Whole Milk',
        price:2.69,
        category:'Dairy'
    }
]
Product.insertMany(seedproducts)
.then(res=>{
    console.log(res)
})
.catch(e=>{
    console.log(e)
})