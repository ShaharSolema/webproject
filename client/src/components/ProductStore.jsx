// ProductStore.jsx
import React, { useState } from 'react';
import Product from '../components/Home/Product';
import '../styles/Store.css';

const ProductStore = () => {
    const [cartItems, setCartItems] = useState([]); // מצב עבור סל הקניות

    const handleAddToCart = (product) => {
        setCartItems(prevItems => [...prevItems, product]); // הוספת המוצר לסל
        console.log(`המוצר ${product.name} נוסף לסל!`);
    };

    return (
        <div className="store-container">
            <h1 className="store-title">חנות</h1>
            <div>
                {cartItems.length > 0 && (
                    <div className="cart-container">
                        <h2>סל הקניות</h2>
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index}>{item.name} - {item.price} ש"ח</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <Product 
                image={require('../styles/pictures/Courses/One.png')}
                price={100}
                name="מוצר לדוגמה" // הכנס את שם המוצר כאן
                onAddToCart={() => handleAddToCart({ name: 'מוצר לדוגמה', price: 100 })}
            />
            {/* כאן תוכל להוסיף עוד מוצרים לפי הצורך */}
        </div>
    );
};

export default ProductStore;
