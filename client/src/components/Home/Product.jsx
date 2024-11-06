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

        const newQuantity = quantity + 1;
        if (newQuantity <= stock) {
            setQuantity(newQuantity);
            onUpdateCart(newQuantity);
        }
    };

    const handleRemove = () => {
        if (!isLoggedIn) {
            alert('Please log in to modify cart');
            return;
        }

        if (quantity > 0) {
            const newQuantity = quantity - 1;
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
            <div className="quantity-control">
                <button 
                    onClick={handleRemove} 
                    className="quantity-button"
                    disabled={quantity === 0 || !isLoggedIn}
                >
                    -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                    onClick={handleAdd} 
                    className="quantity-button"
                    disabled={quantity >= stock || !isLoggedIn}
                >
                    +
                </button>
            </div>
            {stock <= 0 && <p className="out-of-stock">Out of Stock</p>}
            {stock > 0 && <p className="stock-info">In Stock: {stock}</p>}
            {!isLoggedIn && (
                <p className="login-notice">Log in to add to cart</p>
            )}
        </div>
    );
};

export default Product;
