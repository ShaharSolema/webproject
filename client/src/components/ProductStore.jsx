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
        { id: 1, image: '../../styles/art.png', price: 100, description: 'מוצר 1' },
        { id: 2, image: '../../styles/pictures/Courses/Product2.png', price: 110, description: 'מוצר 2' },
        { id: 3, image: '../../styles/pictures/Courses/Product3.png', price: 120, description: 'מוצר 3' },
        { id: 4, image: '../../styles/pictures/Courses/Product4.png', price: 130, description: 'מוצר 4' },
        { id: 5, image: '../../styles/pictures/Courses/Product5.png', price: 140, description: 'מוצר 5' },
        { id: 6, image: '../../styles/pictures/Courses/Product6.png', price: 150, description: 'מוצר 6' },
        { id: 7, image: '../../styles/pictures/Courses/Product7.png', price: 160, description: 'מוצר 7' },
        { id: 8, image: '../../styles/pictures/Courses/Product8.png', price: 170, description: 'מוצר 8' },
        { id: 9, image: '../../styles/pictures/Courses/Product9.png', price: 180, description: 'מוצר 9' },
        { id: 10, image: '../../styles/pictures/Courses/Product10.png', price: 190, description: 'מוצר 10' },
        { id: 11, image: '../../styles/pictures/Courses/Product11.png', price: 200, description: 'מוצר 11' },
        { id: 12, image: '../../styles/pictures/Courses/Product12.png', price: 210, description: 'מוצר 12' },
        { id: 13, image: '../../styles/pictures/Courses/Product13.png', price: 220, description: 'מוצר 13' },
        { id: 14, image: '../../styles/pictures/Courses/Product14.png', price: 230, description: 'מוצר 14' },
        { id: 15, image: '../../styles/pictures/Courses/Product15.png', price: 240, description: 'מוצר 15' },
        { id: 16, image: '../../styles/pictures/Courses/Product16.png', price: 250, description: 'מוצר 16' },
        { id: 17, image: '../../styles/pictures/Courses/Product17.png', price: 260, description: 'מוצר 17' },
        { id: 18, image: '../../styles/pictures/Courses/Product18.png', price: 270, description: 'מוצר 18' },
        { id: 19, image: '../../styles/pictures/Courses/Product19.png', price: 280, description: 'מוצר 19' },
        { id: 20, image: '../../styles/pictures/Courses/Product20.png', price: 290, description: 'מוצר 20' },
        { id: 21, image: '../../styles/pictures/Courses/Product21.png', price: 300, description: 'מוצר 21' },
        { id: 22, image: '../../styles/pictures/Courses/Product22.png', price: 310, description: 'מוצר 22' },
        { id: 23, image: '../../styles/pictures/Courses/Product23.png', price: 320, description: 'מוצר 23' },
        { id: 24, image: '../../styles/pictures/Courses/Product24.png', price: 330, description: 'מוצר 24' },
        { id: 25, image: '../../styles/pictures/Courses/Product25.png', price: 340, description: 'מוצר 25' },
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
