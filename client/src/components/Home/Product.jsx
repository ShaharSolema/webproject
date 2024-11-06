// Product.jsx
import React, { useState, useEffect } from 'react';

const Product = ({ 
    image, 
    price, 
    description, 
    name, 
    stock, 
    onUpdateCart,
    isLoggedIn,
    initialQuantity = 0
}) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const handleAdd = () => {
        if (!isLoggedIn) {
            alert('Please log in to add items to cart');
            return;
        }

        if (stock <= 0) {
            return;
        }

        const newQuantity = quantity + 1;
        if (newQuantity <= stock) {
            setQuantity(newQuantity);
            onUpdateCart(newQuantity);
        }
    };

    const handleSubtract = () => {
        if (!isLoggedIn) {
            return;
        }

        const newQuantity = quantity - 1;
        if (newQuantity >= 0) {
            setQuantity(newQuantity);
            onUpdateCart(newQuantity);
        }
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={image} alt={name} className="product-image" />
            </div>
            <h3 className="product-name">{name}</h3>
            <p className="product-description">{description}</p>
            <p className="product-price">{price} ₪</p>
            {stock <= 0 ? (
                <p className="out-of-stock">אזל מהמלאי</p>
            ) : (
                <div className="quantity-controls">
                    <button 
                        onClick={handleSubtract} 
                        className="quantity-button"
                        disabled={!isLoggedIn || quantity === 0}
                    >
                        -
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button 
                        onClick={handleAdd} 
                        className="quantity-button"
                        disabled={!isLoggedIn || quantity >= stock}
                    >
                        +
                    </button>
                </div>
            )}
            {!isLoggedIn && (
                <p className="login-notice">התחבר כדי להוסיף לעגלה</p>
            )}
        </div>
    );
};

export default Product;
