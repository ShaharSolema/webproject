// ProductStore.jsx
import React from 'react';
import Product from '../components/Home/Product';
import '../styles/Store.css';

const ProductStore = () => {
    const handleAddToCart = () => {
        console.log('המוצר נוסף לסל!');
        // כאן תוכל להוסיף לוגיקה כדי להוסיף את המוצר לסל
    };

    return (
        <div className="store-container">
            <h1 className="store-title">חנות</h1>
            <Product 
                image="../../styles/pictures/Courses/One.png" // הכנס כאן את הנתיב לתמונה שלך
                price={100} // הכנס כאן את המחיר של המוצר
                onAddToCart={handleAddToCart}
            />
            {/* כאן תוכל להוסיף עוד מוצרים לפי הצורך */}
        </div>
    );
};

export default ProductStore;
