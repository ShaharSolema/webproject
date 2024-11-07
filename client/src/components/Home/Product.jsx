// Product.jsx
import React, { useState, useEffect } from 'react';

const Product = ({ 
    image, 
    price, 
    description, 
    name, 
    stock, 
    discount,
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

    // Calculate discounted price
    const discountedPrice = discount ? price * (1 - discount / 100) : price;

    return (
        <div className="product-card">
            <div className="product-image-container">
                {discount > 0 && (
                    <div className="discount-badge">
                        {discount}% הנחה
                    </div>
                )}
                <img src={image} alt={name} className="product-image" />
            </div>
            <h3 className="product-name">{name}</h3>
            <p className="product-description">{description}</p>
            <div className="price-container">
                {discount > 0 ? (
                    <>
                        <span className="original-price">₪{price.toFixed(2)}</span>
                        <span className="discounted-price">₪{discountedPrice.toFixed(2)}</span>
                    </>
                ) : (
                    <p className="product-price">₪{price.toFixed(2)}</p>
                )}
            </div>
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
