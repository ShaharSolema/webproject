// Product.jsx
import React from 'react';

const Product = ({ image, price, onAddToCart }) => {
    return (
        <div className="product-card">
            <img src={image} alt="Product" className="product-image" />
            <p className="product-price">{price} ₪</p>
            <button onClick={onAddToCart} className="add-to-cart-button">
                הוסף לסל
            </button>
        </div>
    );
};

export default Product;
