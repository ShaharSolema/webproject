// Product.jsx
import React, { useState } from 'react';

const Product = ({ image, price, description, onAddToCart }) => {
    const [quantity, setQuantity] = useState(0);

    const handleAdd = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleRemove = () => {
        setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    };

    

    return (
        <div className="product-card">
            <img src={image} alt={description} className="product-image" />
            <p className="product-description">{description}</p>
            <div className="quantity-control">
                <button onClick={handleRemove} className="quantity-button">-</button>
                <span className="quantity-display">{quantity}</span>
                <button onClick={handleAdd} className="quantity-button">+</button>
            </div>
            <p className="product-price">{price} ₪</p>
            <button 
                onClick={() => onAddToCart(quantity)} 
                className="add-to-cart-button" 
                disabled={quantity === 0}
                title={quantity === 0 ? "בחר כמות כדי להוסיף לסל" : ""}
            >
                הוסף לסל
            </button>
        </div>
    );
};

export default Product;
