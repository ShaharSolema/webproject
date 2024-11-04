// ProductStore.jsx
import React from 'react';
import Product from '../components/Home/Product';
import '../styles/Store.css';

const ProductStore = () => {
    const handleAddToCart = (quantity) => {
        if (quantity > 0) {
            console.log(`הוספת ${quantity} מוצר(ים) לסל!`);
            // לוגיקה להוספת המוצר לסל עם הכמות
        }
    };

    const products = [
        { id: 1, image: 'https://i.imgur.com/C0hThD7.jpeg', price: 100, description: 'מכחולים' },
        { id: 2, image: 'https://i.imgur.com/2gFQ5Px.jpeg', price: 110, description: 'מספריים' },
        { id: 3, image: 'https://i.imgur.com/b0olavx.jpeg', price: 120, description: 'בייס' },
        { id: 4, image: 'https://i.imgur.com/FnL3RLX.jpeg', price: 130, description: 'מקלוני עץ' },
        { id: 5, image: 'https://i.imgur.com/7OIFrFO.jpeg', price: 140, description: 'פינצטה' },
        { id: 6, image: 'https://i.imgur.com/QoWRf4J.jpeg', price: 150, description: 'עוצר דם' },
        { id: 7, image: 'https://i.imgur.com/osxMdOm.jpeg', price: 160, description: 'פצירה' },
        { id: 8, image: 'https://i.imgur.com/BYjv0wr.jpeg', price: 170, description: 'מוצר 8' },
        { id: 9, image: 'https://i.imgur.com/krLieEY.jpeg', price: 180, description: 'מוצר 9' },
        { id: 10, image:'https://i.imgur.com/BGcdGv7.jpeg', price: 190, description: 'מוצר 10' },
        { id: 11, image:'https://i.imgur.com/ovITVQs.jpeg', price: 200, description: 'מוצר 11' },
        { id: 12, image:'https://i.imgur.com/uxd8QF6.jpeg', price: 210, description: 'מוצר 12' },
        { id: 13, image:'https://i.imgur.com/y8U1FDB.jpeg', price: 220, description: 'מוצר 13' },
        { id: 14, image:'https://i.imgur.com/TG0pZns.jpeg', price: 230, description: 'מוצר 14' },
        { id: 15, image:'https://i.imgur.com/h9xu9Mg.jpeg', price: 240, description: 'מוצר 15' },
        { id: 16, image:'https://i.imgur.com/l7P1Vsl.jpeg', price: 250, description: 'מוצר 16' },
    ];

    return (
        <div className="store-container">
            <h1 className="store-title">חנות</h1>
            <div className="product-grid">
                {products.map(product => (
                    <Product 
                        key={product.id}
                        image={product.image}
                        price={product.price}
                        description={product.description}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductStore;
