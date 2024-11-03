// Product.jsx
import React from 'react';

const Product = ({ image, price, onAddToCart, name }) => {
    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-image" />
            <h2 className="product-price">{price} ש"ח</h2>
            <button className="add-to-cart-button" onClick={onAddToCart}>הוספה לסל</button>
        </div>
    );
};

export default Product;
